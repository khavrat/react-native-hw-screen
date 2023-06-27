import { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import { KeyboardContext } from "../../contexts/KeyboardContext";

import imageBg from "../../assets/images/imageBg.jpg";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import commentsIcon from "../../assets/icons/commentsIcon.png";

import Avatar from "../../components/formComponents/Avatar";
import LogOutButton from "../../components/screenComponents/LogOutButton";
import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = ({ navigation }) => {
  const { isShowKeyboard, keyboardHide, keyboardShow } =
    useContext(KeyboardContext);
  const [userPosts, setUserPosts] = useState(null);
  const dispatch = useDispatch();
  const { userId, login, avatarPath } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);


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
      setUserPosts(userPostsFromFirebase);
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


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={imageBg} style={styles.background}>
          <View style={styles.box}>
              <Avatar  />
            <View style={styles.logOutBtn}>
              <LogOutButton onPress={signOut} />
            </View>
            <Text style={styles.titleBox}>{login}</Text>
          </View>
        </ImageBackground>
        <FlatList
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
                <TouchableOpacity
                  style={styles.infoDetails}
                  title="go to comments"
                  activeOpacity={0.8}
                  onPress={() => {
                    item.location && openComments(item.id, item.photo);
                  }}
                >
                  <Image
                    source={commentsIcon}
                    size={24}
                    style={styles.infoDetailsIcon}
                  />
                  <View>
                    <Text>0</Text>
                  </View>
                </TouchableOpacity>
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
    </TouchableWithoutFeedback>
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
  infoDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  infoDetailsIcon: {
    marginRight: 4,
  },
  locationInfo: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
