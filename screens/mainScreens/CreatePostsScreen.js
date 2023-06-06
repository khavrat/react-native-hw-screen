import { useState, useContext } from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// import { Camera } from "expo-camera";
// import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../../components/formComponents/FormButton";

import cameraIcon from "../../assets/icons/cameraIcon.png";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import trashIcon from "../../assets/icons/trashIcon.png";

import { TouchableOpacity } from "react-native-gesture-handler";

import { KeyboardContext } from "../../contexts/KeyboardContext";
import useHideTabBarOnMainScreen from "../../helpers/useHideTabBarOnMain";

const initialPostState = {
  title: "",
  place: "",
};

const CreatePostsScreen = () => {
  const { keyboardHide, keyboardShow } = useContext(KeyboardContext);
  const [postState, setPostState] = useState(initialPostState);
  const [isActiveInput, setIsActiveInput] = useState("");

  useHideTabBarOnMainScreen()

  const handleFocus = (inputName) => {
    keyboardShow();
    setIsActiveInput(inputName);
  };

  const handleBlur = () => {
    setIsActiveInput("");
  };

  const handleInputChange = (field, value) => {
    if (value !== "") {
      setPostState((prevState) => ({
        ...prevState,
        [field]: value,
        inputFilled: true,
      }));
    } else {
      setPostState((prevState) => ({
        ...prevState,
        [field]: value,
        inputFilled: false,
      }));
    }
  };

  const handleSubmit = () => {
    keyboardHide();
    console.log("postState :>> ", postState);
    setPostState(initialPostState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always"
          extraScrollHeight={Platform.select({
            ios: 160,
            android: -160,
          })}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View>
            <View style={styles.photoContainer}>
              <View style={styles.cameraWrapper}>
                <Image source={cameraIcon} size={24} />
              </View>
            </View>
            <Text style={styles.textLoad}>Завантажте фото</Text>
            <View style={styles.inputList}>
              <TextInput
                style={{
                  ...styles.input,
                  borderBottomColor:
                    isActiveInput === "title" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  handleFocus("title");
                }}
                onBlur={handleBlur}
                value={postState.title}
                onChangeText={(value) => handleInputChange("title", value)}
              />
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    ...styles.lastInput,
                    borderBottomColor:
                      isActiveInput === "place" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Mісцевість..."
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    handleFocus("place");
                  }}
                  onBlur={handleBlur}
                  value={postState.place}
                  onChangeText={(value) => handleInputChange("place", value)}
                />
                <Image source={mapPinIcon} size={24} style={styles.mapPinImg} />
              </View>
            </View>
            <FormButton onPress={handleSubmit} isActive={postState.inputFilled}>
              Опублікувати
            </FormButton>
          </View>
          <View style={styles.trashButtonWrapper}>
            <TouchableOpacity style={styles.trashButton} activeOpacity={0.8}>
              <Image source={trashIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  photoContainer: {
    width: "100%",
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textLoad: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontWeight: 400,
  },
  inputList: {
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    paddingTop: Platform.OS === "ios" ? 16 : 11,
    paddingBottom: Platform.OS === "ios" ? 16 : 11,
    marginBottom: 16,
  },
  lastInput: {
    marginBottom: 0,
    position: "relative",
    paddingLeft: 28,
  },
  mapPinImg: {
    position: "absolute",
    top: 13,
    left: 0,
  },
  trashButtonWrapper: {
    alignItems: "center",
    marginBottom: 34,
  },
  trashButton: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

// const [camera, setCamera] = useState(null);
// const [photo, setPhoto] = useState('');

// const takePhoto = async () => {
//   const photo = await camera.takePictureAsync();
//   setPhoto(photo.uri)
// };
// console.log('photo :>> ', photo);

{
  /* <Camera style={styles.camera} ref={setCamera}>
        {photo && <View style={styles.photoContainer}><Image source={{ uri: photo }} style={ {width: 200, height:200}} /></View>}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera> */
}

// camera: {
//   // height: 300,
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
// },
// photoContainer: {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   borderColor: 'red',
//   borderWidth: 1,
// },
// snapContainer: {
//   marginTop: 500,
//   borderWidth: 1,
//   borderColor: "#fff",
//   width: 70,
//   height: 70,
//   justifyContent: "center",
//   alignItems: "center",
// },
// snap: {
//   color: "#fff",
// },
