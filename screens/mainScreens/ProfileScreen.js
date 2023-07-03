import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import imageBg from "../../assets/images/imageBg.jpg";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import commentsIcon from "../../assets/icons/commentsIcon.png";
import commentsActiveIcon from "../../assets/icons/commentsActiveIcon.png";
import thumbUp from "../../assets/icons/thumbUp.png";
import thumbUpActive from "../../assets/icons/thumbUpActive.png";

import Avatar from "../../components/formComponents/Avatar";
import LogOutButton from "../../components/screenComponents/LogOutButton";

import { authSignOutUser } from "../../redux/auth/authOperations";


const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState(null);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isFocused) {
      getUserPosts();
    }
  }, [isFocused]);

  const getUserPosts = async () => {
    try {
      const userPosts = query(
        collection(db, "posts"),
        where("user.userId", "==", userId)
      );
      const querySnapshot = await getDocs(userPosts);

      const userPostsFromFirebase = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const postCommentsPromises = userPostsFromFirebase.map((post) =>
        getDocs(collection(db, `posts/${post.id}/comments`))
      );
      const postCommentsSnapshots = await Promise.all(postCommentsPromises);

      const postsWithCountComments = userPostsFromFirebase.map(
        (post, index) => ({
          ...post,
          countComments: postCommentsSnapshots[index].size,
        })
      );
      setUserPosts(postsWithCountComments);
    } catch (error) {
      console.log("error in  getUserPosts:>> ", error.message);
    }
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  const openComments = (id, photo) => {
    navigation.navigate("Comments", { id, photo });
  };
  const sendLocationToMap = (latitude, longitude, title) => {
    navigation.navigate("Map", { latitude, longitude, title });
  };

  const toggleCountLikes = (id) => {
    setLiked((prevState) => {
      const newLiked = !prevState;
      updateLikesCountByFirebase(id, newLiked);
      return newLiked;
    });
  };

  const updateLikesCountByFirebase = async (id, newLiked) => {
    try {
      if (newLiked === true) {
        const likesRef = doc(db, `posts/${id}`);

        await updateDoc(likesRef, {
          likes: arrayUnion(userId),
        });

        const updatedDocAdd = await getDoc(likesRef);
        const updatedLikeAdd = updatedDocAdd.data();

        if (updatedLikeAdd.likes) {
          setUserPosts((prevPosts) => {
            const updatedPosts = prevPosts.map((post) => {
              if (post.id === id) {
                return {
                  ...post,
                  likes: updatedLikeAdd.likes,
                };
              }
              return post;
            });
            return updatedPosts;
          });
        }
      }

      if (newLiked === false) {
        const likesRef = doc(db, `posts/${id}`);

        await updateDoc(likesRef, {
          likes: arrayRemove(userId),
        });
        const updatedDocRemove = await getDoc(likesRef);
        const updatedLikeRemove = updatedDocRemove.data();

        if (updatedLikeRemove.likes) {
          setUserPosts((prevPosts) => {
            const updatedPosts = prevPosts.map((post) => {
              if (post.id === id) {
                return {
                  ...post,
                  likes: updatedLikeRemove.likes,
                };
              }
              return post;
            });
            return updatedPosts;
          });
        }
      }
    } catch (error) {
      console.log("error in toggleCountLikes :>> ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBg} style={styles.background}>
        <View style={styles.box}>
          <Avatar />
          <View style={styles.logOutBtn}>
            <LogOutButton onPress={signOut} />
          </View>
          <Text style={styles.titleBox}>{login}</Text>
        </View>
      </ImageBackground>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.photoContainer}>
              <Image
                source={{
                  uri: item.photo ? item.photo.toString() : null,
                }}
                style={{ width: "100%", height: 240 }}
              />
            </View>
            <Text style={styles.photoTitle}>{item.title}</Text>
            <View style={styles.infoBlock}>
              <View style={styles.commentsLikes}>
                <TouchableOpacity
                  style={styles.infoDetails}
                  title="go to comments"
                  activeOpacity={0.8}
                  onPress={() => {
                    openComments(item.id, item.photo);
                  }}
                >
                  {item.countComments > 0 ? (
                    <Image
                      source={commentsActiveIcon}
                      size={24}
                      style={styles.infoDetailsIcon}
                    />
                  ) : (
                    <Image
                      source={commentsIcon}
                      size={24}
                      style={styles.infoDetailsIcon}
                    />
                  )}
                  <View>
                    <Text>{item.countComments}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.infoDetails}
                  title="likes"
                  activeOpacity={0.8}
                  onPress={() => {
                    toggleCountLikes(item.id);
                  }}
                >
                  {item.likes && item.likes.length > 0 ? (
                    <Image
                      source={thumbUpActive}
                      size={24}
                      style={styles.infoDetailsIcon}
                    />
                  ) : (
                    <Image
                      source={thumbUp}
                      size={24}
                      style={styles.infoDetailsIcon}
                    />
                  )}
                  <View>
                    <Text>{item.likes ? item.likes.length : 0}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.infoDetails}
                title="go to map"
                activeOpacity={0.8}
                onPress={() => {
                  item.location &&
                    sendLocationToMap(
                      item.location.latitude,
                      item.location.longitude,
                      item.title
                    );
                }}
              >
                <Image
                  source={mapPinIcon}
                  size={24}
                  style={styles.infoDetailsIcon}
                />
                <Text style={styles.locationInfo}>{item.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        style={{ flex: 1 }}
      ></FlatList>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  box: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
  },
  titleBox: {
    textAlign: "center",
    marginBottom: 33,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  cardContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  photoContainer: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  photoTitle: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  infoBlock: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsLikes: {
    display: "flex",
    flexDirection: "row",
  },
  infoDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  infoDetailsIcon: {
    marginRight: 4,
  },
  locationInfo: {
    maxWidth: 250,
    fontFamily: "Roboto_400Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
