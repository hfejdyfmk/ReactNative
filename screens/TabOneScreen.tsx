// import * as React from 'react';
import { StyleSheet } from 'react-native';

//new
import PropTypes from 'prop-types';
//import { Alert } from 'react-native-reactstrap'; //改用material UI
import { connect } from 'react-redux';

import React, { useState, useEffect } from 'react'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'

export default function TabOneScreen() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'purse, phone!',
        createdAt: new Date(),
      },
    ])
  }, [])
  return (
    <GiftedChat
      messages={messages}
      //get rid of the typing box
      minComposerHeight={0}
      maxComposerHeight={0}
      minInputToolbarHeight={0}
      renderInputToolbar={() => null}
    />
  )
}
