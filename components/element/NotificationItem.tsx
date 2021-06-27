import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {View, Text} from '../Themed'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleSheet } from 'react-native';

const ICON_SIZE = 24;

const NotificationItem = () => {
  const [messages, setMessages] = useState<any[]>([]);

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
      <Icon
          name='check-circle'
          color={'grey'}
          size={ICON_SIZE}
      />
      <Text>geolocation</Text>
    </View>
  )
}

export default NotificationItem;
