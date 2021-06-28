import * as React from "react";
import PropTypes from "prop-types";
import LocationPicker from "./LocationPicker";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { connect } from "react-redux";

import { selectlocationType } from "../../states/post-actions.js";

class Map extends React.Component {
  static propTypes = {
    currentLatitude: PropTypes.number,
    currentLongtitude: PropTypes.number,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.handleCoorSet = this.handleCoorSet.bind(this);
  }

  render() {
    let currentLatitude = this.props.currentLatitude;
    let currentLongtitude = this.props.currentLongtitude;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <LocationPicker
          initialCoordinate={{
            latitude: currentLatitude,
            longitude: currentLongtitude,
          }}
          onLocationSelect={({ latitude, longitude }) =>
            this.handleCoorSet(longitude, latitude)
          }
        />
      </View>
    );
  }

  handleCoorSet(lon, lat) {
    let coor = JSON.stringify([lon, lat]);
    this.props.dispatch(selectlocationType(coor));
  }
}

export default connect(state => ({
  currentLatitude: (state.currentLocation.latitude == undefined) ? 0 : state.currentLocation.latitude,
  currentLongtitude: (state.currentLocation.longtitude == undefined) ? 0 : state.currentLocation.longtitude,
}))(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});
