import { TouchableOpacity, Image } from "react-native";
import sendBtnIcon from "../../assets/icons/sendBtnIcon.png";

const SendButton = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image source={sendBtnIcon} size={34}  />
    </TouchableOpacity>
  );
};

export default SendButton;
