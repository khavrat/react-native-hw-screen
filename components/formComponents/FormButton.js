import { TouchableOpacity, Text,StyleSheet } from "react-native";

const FormButton = ({ onPress, isActive, children }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.disabledButton,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!isActive}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? styles.activeButtonText : styles.disabledButtonText,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    paddingLeft: 32,
    marginBottom: 16,
    borderRadius: 100,
  },
  activeButton: {
    backgroundColor: "#FF6C00",
  },
  disabledButton: {
    backgroundColor: "#F6F6F6",
  },
  buttonText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
  disabledButtonText: {
    color: "#BDBDBD",
  },
});
