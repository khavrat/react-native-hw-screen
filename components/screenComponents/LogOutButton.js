import { TouchableOpacity, Image } from "react-native";
import logOutIcon from "../../assets/icons/logOutIcon.png";

const LogOutButton = ({onPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image
        source={logOutIcon}
        size={24}
        style={{ tintColor: "#212121" }}
      />
    </TouchableOpacity>
  );
};

export default LogOutButton;
