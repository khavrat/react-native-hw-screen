import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import commentsIcon from "../../assets/icons/commentsIcon.png";

const HomePostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const sendLocationToMap = (latitude, longitude, title) => {
    navigation.navigate("Map", { latitude, longitude, title });
  };

  const openComments = (photo) => {
    navigation.navigate("Comments", { photo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDataContainer}>
        <View style={styles.userPhotoContainer}></View>
        <View>
          <Text style={styles.userName}>It wil be userName</Text>
          <Text style={styles.userEmail}>It wil be userEmail</Text>
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
            <Text style={styles.photoTitle}>{item.postState.title}</Text>
            <View style={styles.infoBlock}>
              <TouchableOpacity
                style={styles.infoDetails}
                title="go to comments"
                activeOpacity={0.8}
                onPress={() => {
                  item.location && openComments(item.photo);
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
                      item.location.coords.latitude,
                      item.location.coords.longitude,
                      item.postState.title
                    );
                }}
              >
                <Image
                  source={mapPinIcon}
                  size={24}
                  style={styles.infoDetailsIcon}
                />
                <Text style={styles.locationInfo}>{item.postState.place}</Text>
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
