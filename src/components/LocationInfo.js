import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LocationInfo = ({userLocation}) => {
  return (
    <View style={styles.locationContainer}>
      <Text style={styles.locationText}>
        Latitude: {userLocation?.latitude.toFixed(6)}
      </Text>
      <Text style={styles.locationText}>
        Longitude: {userLocation?.longitude.toFixed(6)}
      </Text>
    </View>
  );
};

export default LocationInfo;

const styles = StyleSheet.create({
  locationText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
  },
  locationContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
