import * as React from 'react';
import { StyleSheet, Platform, View, Text  } from 'react-native';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import PostMain from '../components/element/modify/MainPost.jsx';
import Constants from 'expo-constants';

export default function TabTwoScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log(location);
  if (location){
    return (
      <PostMain currentLat = {location.coords.latitude} currentLon = {location.coords.longitude}/>
    );
  }else{
    return(
      <View>
        <Text style ={{fontSize: 50, justifyContent: 'center', textAlign: 'center'}}>Loading...</Text>
      </View>
    );
  }
  
}
