import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import arrowBackIcon from "../../assets/icons/arrowBackIcon.png";


const GoBackButton = () => {
    const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  }
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleGoBack}
    >
      <Image
        source={arrowBackIcon}
        size={24}
        style={{ marginLeft: 16, tintColor: "#212121" }}
      />
    </TouchableOpacity>
  );
};

export default GoBackButton;
