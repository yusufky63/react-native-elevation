import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Compass.style';
const getCardinalDirection = heading => {
  if (heading >= 337.5 || heading < 22.5) {
    return 'N';
  } else if (heading >= 22.5 && heading < 67.5) {
    return 'NE';
  } else if (heading >= 67.5 && heading < 112.5) {
    return 'E';
  } else if (heading >= 112.5 && heading < 157.5) {
    return 'SE';
  } else if (heading >= 157.5 && heading < 202.5) {
    return 'S';
  } else if (heading >= 202.5 && heading < 247.5) {
    return 'SW';
  } else if (heading >= 247.5 && heading < 292.5) {
    return 'W';
  } else {
    return 'NW';
  }
};

const CompassArrow = ({compassHeading}) => {
  const cardinalDirection = getCardinalDirection(compassHeading);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.arrowContainer,
          {transform: [{rotate: `${compassHeading}deg`}]},
        ]}>
        <Icon name="location-arrow" size={24} color="red" />
      </View>

      <Text style={{fontSize: 14, color: 'black'}}>
        {compassHeading}° {cardinalDirection}
      </Text>
    </View>
  );
};

export default CompassArrow;
