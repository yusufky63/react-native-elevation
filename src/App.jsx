import React from 'react';
import Toast from 'react-native-toast-message';
import Map from './components/Map/Map';

const App = () => {
  return (
    <React.Fragment>
      <Map />
      <Toast />
    </React.Fragment>
  );
};

export default App;
