import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {View} from '../components/Themed'

import ThreeDots from '../components/element/ThreeDots';
import NotificationItem from '../components/element/NotificationItem'

export default function TabOneScreen() {
  return (
    <View style={{flex: 1}}>
      <ThreeDots/>
      <NotificationItem/>
    </View>
  )
}
