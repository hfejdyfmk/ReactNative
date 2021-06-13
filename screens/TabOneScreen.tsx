
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//new
import PropTypes from 'prop-types';
//import { Alert } from 'react-native-reactstrap'; //改用material UI
import { connect } from 'react-redux';

// <EditScreenInfo path="/screens/TabOneScreen.tsx" />

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> 
     

      <Text>This is Setting</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //new
    backgroundColor: 'rgba(245, 222, 179, 1.0)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: { //畫面上的線
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



