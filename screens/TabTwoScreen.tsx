import * as React from 'react';
import { StyleSheet } from 'react-native';

import SwitchToggle from '../components/element/SwitchToggle';
//import Inputs from '../components/element/TextInput';
import RemindItem from '../components/element/demo/RemindItem';
import ListItem from '../components/element/demo/RemindItemList'
import App from '../components/element/test';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.switchButton}>
      <Text>Vibration</Text>
      <SwitchToggle/></View>
      
      <RemindItem/>
      <ListItem/>

      <App/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 20,
     
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
