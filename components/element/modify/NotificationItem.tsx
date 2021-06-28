import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {View, Text} from '../../Themed'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native';

const ICON_SIZE = 24;

const NotificationItem = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [isCheckedEnabled, setCheckedIsEnabled] = useState(false);
  const setCheckedIcon = () => setCheckedIsEnabled(previousState => !previousState);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'purse, phone!',
        createdAt: new Date(),
        user: {
          _id: 2,
        }
      },
    ])
  }, [])

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <GiftedChat 
        messages={messages}
        //get rid of the typing box
        minComposerHeight={0}
        maxComposerHeight={0}
        minInputToolbarHeight={0}
        renderInputToolbar={() => null}
      />
      <MaterialCommunityIcons.Button
          name={isCheckedEnabled? 'check-circle': 'check-circle-outline'}
          color={'grey'}
          size={ICON_SIZE}
          onPress={setCheckedIcon}
          backgroundColor={'transparent'}
      />
      <Text
        style={{color: 'grey'}}
      >
        geolocation
      </Text>
    </View>
  )
}

export default NotificationItem;
