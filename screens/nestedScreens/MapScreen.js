import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import useHideTabBarOnNestedScreen from "../../helpers/useHideTabBarOnNested";

const MapScreen = ({ route }) => {
  const { latitude, longitude, title } = route.params;
  
  useHideTabBarOnNestedScreen();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }} title={ title} />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
