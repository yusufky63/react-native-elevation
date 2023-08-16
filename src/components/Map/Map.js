import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';
import * as Permissions from 'react-native-permissions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import Toast from 'react-native-toast-message';
import styles from './Map.style';
import Compass from '../Compass/Compass';
import SavedLocationsModal from '../SavedLocationsModal';
import LocationInfo from '../LocationInfo';

const Map = () => {
  const [gpsAltitude, setGpsAltitude] = useState(0);
  const [locationAltitude, setLocationAltitude] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [initialZoomDone, setInitialZoomDone] = useState(false);
  const mapReady = useRef(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);

  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  React.useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      console.log(heading);
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const requestLocationPermission = async () => {
    const response = await Permissions.request(
      Permissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (response === 'granted') {
      startLocationUpdates();
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission was not granted. The app needs location access to function properly.',
        [{text: 'OK', onPress: () => {}}],
      );
    }
  };

  const startLocationUpdates = () => {
    Geolocation.watchPosition(
      position => {
        const {latitude, longitude, altitude} = position.coords;
        setUserLocation({latitude, longitude});
        setGpsAltitude(altitude);
        getLocationAltitude(latitude, longitude);
      },
      error => {
        console.error('Error getting location updates:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        timeInterval: 30000,
      },
    );
  };

  const getLocationAltitude = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.opentopodata.org/v1/eudem25m?locations=${latitude},${longitude}`,
      );
      const data = await response.json();
      if (data.status === 'OK') {
        const locationAltitude = data.results[0].elevation || 0;
        setLocationAltitude(locationAltitude);
      } else {
        console.error('Error fetching location altitude:', data.message);
      }
    } catch (error) {
      console.error('Error fetching location altitude:', error);
    }
  };

  const handleMapDoubleClick = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
    getLocationAltitude(coordinate.latitude, coordinate.longitude);
  };

  const saveLocation = () => {
    if (selectedLocation) {
      setSavedLocations([...savedLocations, selectedLocation]);
      setSelectedLocation(null);
      Toast.show({
        type: 'success',
        text1: 'Location Saved',
        text2: 'The location has been saved to the list.',
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'No Location Selected',
        text2: 'Please select a location on the map before saving.',
        visibilityTime: 2000,
      });
    }
  };

  const removeLocation = location => {
    const updatedLocations = savedLocations.filter(item => item !== location);
    setSavedLocations(updatedLocations);
  };

  const goToUserLocation = () => {
    if (mapRef && userLocation) {
      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const handleMapReady = () => {
    if (!initialZoomDone && userLocation && mapReady.current) {
      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setInitialZoomDone(true);
    }
  };

  const handleRegionChange = region => {
    if (initialZoomDone) {
      setInitialZoomDone(false);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderSavedLocation = ({item}) => (
    <TouchableOpacity
      style={styles.savedLocationItem}
      onPress={() => handleSavedLocationPress(item)}>
      <Text style={styles.savedLocationText}>
        Latitude: {item.latitude.toFixed(6)}, Longitude:{' '}
        {item.longitude.toFixed(6)}
      </Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeLocation(item)}>
        <Icon
          onPress={() => removeLocation(item)}
          name="trash"
          size={20}
          color="red"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleSavedLocationPress = location => {
    setSelectedLocation(location);
    goToLocation(location);
    closeModal();
  };

  const goToLocation = location => {
    if (mapRef && location) {
      mapRef.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={ref => {
          setMapRef(ref);
          mapReady.current = true;
        }}
        showsUserLocation={true}
        compassEnabled={true}
        compassOffset={{x: -10, y: 50}}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        region={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={handleMapDoubleClick}
        onMapReady={handleMapReady}
        onRegionChange={handleRegionChange}>
        {userLocation && <Marker coordinate={userLocation} />}
        {selectedLocation && (
          <Marker coordinate={selectedLocation} pinColor="blue" />
        )}
        {savedLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            pinColor="red"
            onPress={() => handleSavedLocationPress(location)}
          />
        ))}
      </MapView>
      <LocationInfo userLocation={userLocation} />
      {showAdditionalContent ? (
        <View style={styles.additionalContentContainer}>
          <View style={styles.toggleView}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowAdditionalContent(!showAdditionalContent)}>
              <Icon
                name={!showAdditionalContent ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.innerContainer}>
            <Text style={styles.title}>Elevation</Text>
            <View style={styles.ValueContainer}>
              <View style={styles.altitudeText}>
                <Icons name="crosshairs-gps" size={24} color="black" />
                <Text style={styles.altitudeValue}>
                  {gpsAltitude.toFixed(2)} m
                </Text>
              </View>
              <View style={styles.altitudeText}>
                <Compass compassHeading={compassHeading} />
              </View>
              <View style={styles.altitudeText}>
                <Icon name="map-marker" size={24} color="black" />
                <Text style={styles.altitudeValue}>
                  {locationAltitude.toFixed(2)} m
                </Text>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={goToUserLocation}>
                <Icon name="location-arrow" size={24} color="black" />
                <Text style={styles.buttonText}>Go to My Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={saveLocation}>
                <Icon name="save" size={24} color="black" />
                <Text style={styles.buttonText}>Save Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={openModal}>
                <Icon name="list" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowAdditionalContent(!showAdditionalContent)}>
          <Icon
            name={!showAdditionalContent ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
      <SavedLocationsModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        savedLocations={savedLocations}
        handleSavedLocationPress={handleSavedLocationPress}
      />
    </View>
  );
};

export default Map;
