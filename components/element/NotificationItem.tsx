import React, { useState, useEffect } from 'react'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {View} from '../Themed'

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
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        //get rid of the typing box
        minComposerHeight={0}
        maxComposerHeight={0}
        minInputToolbarHeight={0}
        renderInputToolbar={() => null}
      />
    </View>
  )
}

export default NotificationItem;
