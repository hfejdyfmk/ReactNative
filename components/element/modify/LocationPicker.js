import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, TouchableOpacity, View, Text, Platform, PermissionsAndroid } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Dimensions, StyleSheet } from 'react-native'
//import styles from './LocationPickers'
import * as Location from 'expo-location';
import {togglelocationType} from '../../states/post-actions.js';
const DEFAULT_DELTA = { latitudeDelta: 0.015, longitudeDelta: 0.0121 }

const width = Dimensions.get('window');
const height = Dimensions.get('window');

export default class LocationPicker extends Component {
  static propTypes = {
    initialCoordinate: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired
    }),
    buttonText: PropTypes.string,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
    onLocationSelect: PropTypes.func,
    dispatch: PropTypes.func,
  }

  static defaultProps = {
    buttonText: 'Select Location',
    buttonStyle: {},
    textStyle: {},
    onLocationSelect: (coordinates) => ({}),
  }

  state = {
    isMapReady: false,
    loading: true,
    coordinate: {
      ...DEFAULT_DELTA,
      ...this.props.initialCoordinate
    },
    marker: this.props.initialCoordinate,
  }

  componentDidMount() {
    const { initialCoordinate } = this.props
    if (initialCoordinate)
      this.setPosition(initialCoordinate)
    else
      this.getCurrentPosition()
  }

  setPosition = ({ latitude, longitude }) => {
    this.setState({
      loading: false,
      coordinate: {
        ...DEFAULT_DELTA,
        latitude,
        longitude
      },
      marker: {
        latitude,
        longitude
      }
    })
  }

  getSelectedPosition = () => {
    const { coordinate } = this.state
    const { latitude, longitude } = coordinate
    return {
      latitude,
      longitude
    }
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this._getCurrentLocation()
        console.log('Location permission granted')
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  //options)
  //navigator.geolocation.getCurrentPosition(
  _getCurrentLocation = () => {
    let location = Location.getCurrentPositionAsync({});
    this.setPosition(location.coords);
    /*Location.getCurrentPositionAsync((position) => {
      this.setPosition(position.coords)
    },
      (error) => {
        this.setState({ error: error.message })
      },
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
    )*/
  }

  getCurrentPosition = async () => {
    if (Platform.OS === 'android') {
      console.log("1");
      this.requestLocationPermission()
      //console.log("2");
    } else {
      this._getCurrentLocation()
    }
  }

  onMarkerDragEnd = (e) => {
    const { coordinate } = e.nativeEvent
    this.setPosition(coordinate)
  }

  onMapPress = (e) => {
    const { coordinate } = e.nativeEvent
    this.setPosition(coordinate)
    //console.log(e);
  }

  onSelect = () => {
    const { onLocationSelect } = this.props
    //this.props.dispatch(togglelocationType());
    if (typeof onLocationSelect === 'function')
      onLocationSelect(this.getSelectedPosition())
  }

  getIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  //provider={PROVIDER_GOOGLE}
  render() {
    const { loading } = this.state
    const { buttonText, buttonStyle, textStyle, ...props } = this.props
    //console.log(this.getCurrentPosition());
    return (
      loading
        ? this.getIndicator()
        : <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.state.coordinate}
            minZoomLevel={16}
            onLayout={this.onMapLayout}
            onPress={this.onMapPress}
            {...props}>
            <Marker draggable
              coordinate={this.state.marker}
              onDragEnd={this.onMarkerDragEnd}
            />
          </MapView>
          <View style={styles.selectBtnContainer}>
            <TouchableOpacity style={{ ...styles.selectBtn, ...buttonStyle }} onPress={this.onSelect}>
              <Text style={{ ...styles.selectBtnText, ...textStyle }}>{buttonText}</Text>
            </TouchableOpacity>
          </View>

        </View >
    )
  }
}
/* 

*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: (Dimensions.get('window').width)*0.6,
    height: (Dimensions.get('window').height)*0.6,
  },
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectBtnContainer: {
    position: 'absolute',
    bottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  selectBtn: {
    borderRadius: 3,
    backgroundColor: '#000000',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'

  },
  selectBtnText: {
    color: '#ffffff'
  }
});