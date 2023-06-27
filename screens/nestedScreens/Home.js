import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import commentsIcon from "../../assets/icons/commentsIcon.png";

const HomePostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const { login, email, userId, avatarPath } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    const newPosts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(newPosts);
  };
  console.log("posts :>> ", posts);

  const sendLocationToMap = (latitude, longitude, title) => {
    navigation.navigate("Map", { latitude, longitude, title });
  };

  const openComments = (id, photo) => {
    navigation.navigate("Comments", { id, photo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.userPhotoContainer}>
          {avatarPath !== null && (
            <Image
              source={{ uri: avatarPath }}
              style={{ width: 60, height: 60, borderRadius: 16 }}
            />
          )}
        </View>
        <View>
          <Text style={styles.userName}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: item.photo ? item.photo.toString() : null }}
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
  );
};

export default HomePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  userDataContainer: {
    marginTop: 32,
    marginBottom: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  userPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  userName: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto_400Regular",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  cardContainer: {
    marginBottom: 32,
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
