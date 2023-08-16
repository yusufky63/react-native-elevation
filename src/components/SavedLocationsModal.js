import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const SavedLocationsModal = ({
  modalVisible,
  closeModal,
  savedLocations,
  handleSavedLocationPress,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Saved Locations</Text>
          {savedLocations.length > 0 ? (
            <FlatList
              data={savedLocations}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.savedLocationItem}
                  onPress={() => handleSavedLocationPress(item)}>
                  <Text style={styles.savedLocationText}>
                    Latitude: {item.latitude.toFixed(6)}, Longitude:{' '}
                    {item.longitude.toFixed(6)}
                  </Text>

                  {/* ... (Remove button) */}
                </TouchableOpacity>
              )}
              style={styles.savedLocationsList}
            />
          ) : (
            <Text style={styles.noData}>No data</Text>
          )}
          {/* Close Button */}
          <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SavedLocationsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  savedLocationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  savedLocationText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  removeButton: {
    marginLeft: 10,
    paddingVertical: 5,
  },
  removeButtonText: {
    color: 'red',
  },
  modalButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
