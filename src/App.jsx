import React from 'react';
import {View} from 'react-native';

import Toast from 'react-native-toast-message';
import Map from './components/Map/Map';

const App = () => {
  return (
    <>
      <Map />
      <Toast />
    </>
  );
};

export default App;
