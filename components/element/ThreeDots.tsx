// import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import PropTypes from 'prop-types'

const ICON_SIZE = 24

import React, { useState, useEffect } from 'react'
import { View, Switch, StyleSheet} from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const ThreeDots = () => {
  //menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  //toggle
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleChecked = () => setIsEnabled(previousState => !previousState);
  const toggleDay = () => setIsEnabled(previousState => !previousState);
  const toggleWeek = () => setIsEnabled(previousState => !previousState);
  const toggleMonth = () => setIsEnabled(previousState => !previousState);


  return (
    <Provider>
      <View style={{flexDirection: 'row-reverse'}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Icon
            name='more-vert'
            size={ICON_SIZE}
            color={'grey'}
            onPress={openMenu}/>
          }>
          <View style={{flexDirection: 'row', flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
            <Menu.Item onPress={() => {}} title="checked" />
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleChecked}
            value={isEnabled}
            />
          </View>
          <Divider />
          <View style={{flexDirection: 'row', flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
            <Menu.Item onPress={() => {}} title="day" />
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDay}
            value={isEnabled}
            />
          </View>
          <Divider />
          <View style={{flexDirection: 'row', flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
            <Menu.Item onPress={() => {}} title="week" />
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleWeek}
            value={isEnabled}
            />
          </View>
            <Divider />
          <View style={{flexDirection: 'row', flexGrow: 1, justifyContent:'center', alignItems: 'center'}}>
            <Menu.Item onPress={() => {}} title="month" />
            <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleMonth}
            value={isEnabled}
            />
          </View>
        </Menu>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ThreeDots;