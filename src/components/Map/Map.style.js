import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // White background color
  },
  map: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  toggleButton: {
    position: 'absolute',
    alignItems: 'center',
    padding: 5,
    bottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    elevation: 1,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,

    padding: 10,
  },
  toggleView: {
    alignItems: 'flex-end',
    padding: 5,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  additionalContentContainer: {
    position: 'absolute',
    width: '100%',
    borderRadius: 15,
    bottom: 0,
    left: 0,
    padding: 0,
    elevation: 12,

    shadowColor: 'gray',
  },

  innerContainer: {
    position: 'relative',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,

    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderWidth: 1,
    borderColor: '#f6F6F6',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Black text color
    textAlign: 'center',
  },
  ValueContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  altitudeText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
    color: 'black',
    flexDirection: 'column',
    alignItems: 'center',
  },
  altitudeValue: {
    fontWeight: 'normal',
    fontSize: 14,
    marginVertical: 8,
    color: 'black',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',

    paddingVertical: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;
