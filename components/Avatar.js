import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import addAvatar from '../assets/images/addAvatar.png';


const Avatar = () => {
  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity activeOpacity={0.6} >
        <Image source={addAvatar} style={styles.btnSvg}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 200,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btnSvg: {
    position: 'absolute',
    top: 81,
    left: 107,
    width: 25,
    height: 25,
    resizeMode: "cover",
    zIndex: 5,
  },
});
