// import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import PropTypes from 'prop-types'

const ICON_SIZE = 24

import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const ThreeDots = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Icon
            name='more-vert'
            size={ICON_SIZE}
            color={'grey'}
            onPress={openMenu}/>
          }>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
}

export default ThreeDots;