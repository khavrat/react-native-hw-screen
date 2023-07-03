import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";
import { useState } from "react";

const ShowPasswordButton = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleTogglePassword = () => {
      setIsShowPassword(!isShowPassword);
  };

  return (
    <TouchableWithoutFeedback
      onPress={handleTogglePassword}
      isShowPassword={isShowPassword}
    >
      <View style={styles.toggleBtn}>
        <Text style={styles.toggleBtnText}>
          {isShowPassword ? "Сховати" : "Показати"}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ShowPasswordButton;

const styles = StyleSheet.create({
  toggleBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  toggleBtnText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
