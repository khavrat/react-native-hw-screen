import { useState, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormButton from "../../components/formComponents/FormButton";

import cameraIcon from "../../assets/icons/cameraIcon.png";
import flipCameraIcon from "../../assets/icons/flipCameraIcon.png";
import mapPinIcon from "../../assets/icons/mapPinIcon.png";
import trashIcon from "../../assets/icons/trashIcon.png";

import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/config";

import { KeyboardContext } from "../../contexts/KeyboardContext";
import useHideTabBarOnMainScreen from "../../helpers/useHideTabBarOnMain";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initialPostState = {
  title: "",
  place: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const { keyboardHide, keyboardShow } = useContext(KeyboardContext);

  const [editPhoto, setEditPhoto] = useState(false);
  const [postState, setPostState] = useState(initialPostState);
  const [isActiveInput, setIsActiveInput] = useState("");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useHideTabBarOnMainScreen();

  if (!permission || !permission.granted) {
    requestPermission();
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("В дозволі на доступ до локації було відмовлено");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getLocationName = async (latitude, longitude) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("В дозволі на доступ до локації було відмовлено");
        return;
      }
      const location = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (location.length > 0) {
        const { region, country } = location[0];
        return `${region}, ${country}`;
      }
    } catch (error) {
      console.log(error.message);
    }
    return null;
  };

  const putLocationToInput = async (latitude, longitude) => {
    const locationName = await getLocationName(latitude, longitude);
    setPostState((prevState) => ({
      ...prevState,
      place: locationName,
    }));
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      const { latitude, longitude } = location.coords;
      putLocationToInput(latitude, longitude);
      setEditPhoto(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const photoExchangeThroughFirestore = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();

      const uniquePostId = Date.now().toString();

      const storageRef = ref(storage, `postsPhoto/${uniquePostId}`);

      await uploadBytes(storageRef, file);
      const downloadPhoto = await getDownloadURL(storageRef);
      return downloadPhoto;
    } catch (error) {
      console.log(error);
    }
  };

  const postExchangeThroughFirestore = async () => {
    try {
      const photo = await photoExchangeThroughFirestore()
      console.log('whate is in base :>> ', photo);
      const postRef = await addDoc(collection(db, "posts"), {
        photo: photo,
        place: postState.place,
        title: postState.title,
        location: location.coords,
        user: {userId, login}
      });
      console.log('postRef.id :>> ', postRef.id);

    } catch (error) {
      console.log(error)
    }
  };

  const getEditPhoto = () => {
    setPhoto(null);
  };

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

  const trashPost = () => {
    setPhoto(null);
    setEditPhoto(false);
    setPostState(initialPostState);
  };

  const sendPost = () => {
    keyboardHide();
    postExchangeThroughFirestore();
    navigation.navigate("Posts" );
    setPostState(initialPostState);
    setPhoto(null);
    setEditPhoto(false);
  };
  console.log('postState :>> ', postState);

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
            {permission?.granted ? (
              <Camera style={styles.camera} ref={cameraRef} type={type}>
                {photo && (
                  <View style={styles.photoContainer}>
                    <Image
                      source={{ uri: photo || null }}
                      style={{ width: "100%", height: 240 }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.snapContainer}
                  onPress={takePhoto}
                >
                  <Image source={cameraIcon} size={24} />
                </TouchableOpacity>
                <View style={styles.flipCameraContainer}>
                  <TouchableOpacity onPress={toggleCameraType}>
                    <Image source={flipCameraIcon} size={24} />
                  </TouchableOpacity>
                </View>
              </Camera>
            ) : (
              <Text>Чекаємо доступ до камери</Text>
            )}
            <TouchableOpacity onPress={getEditPhoto}>
              {!editPhoto ? (
                <Text style={styles.textLoad}>Завантажте фото</Text>
              ) : (
                <Text style={styles.textLoad}>Редагувати фото</Text>
              )}
            </TouchableOpacity>
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
            <FormButton onPress={sendPost} isActive={postState.inputFilled}>
              Опублікувати
            </FormButton>
          </View>
          <View style={styles.trashButtonWrapper}>
            <TouchableOpacity
              style={styles.trashButton}
              activeOpacity={0.8}
              onPress={trashPost}
            >
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
    paddingHorizontal: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    width: "100%",
    height: 240,
    overflow: "hidden",
    marginTop: 32,
    marginBottom: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  photoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "#E8E8E8",
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
  flipCameraContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
