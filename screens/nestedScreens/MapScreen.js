import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";


const MapScreen = ({ route }) => {
  const { latitude, longitude, title } = route.params;
  const defaultLatitude = 48.5956;
  const defaultLongitude = 37.9999;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude || defaultLatitude,
          longitude: longitude || defaultLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={title || "Бахмут, Україна"}
        />
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
