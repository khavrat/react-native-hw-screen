import { View, Text, Button, StyleSheet } from "react-native";

const HomePostsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>it will be HomePostsScreen</Text>
      <Button
        title="go to comments"
        onPress={() => navigation.navigate("Comments")}
      />
      <Button
        title="go to map"
        onPress={() => navigation.navigate("Map")}
      />
    </View>
  );
};

export default HomePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 26,
    lineHeight: 30,
    color: "#1B4371",
  },
});
