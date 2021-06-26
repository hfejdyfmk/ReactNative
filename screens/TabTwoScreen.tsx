import * as React from 'react';
import { StyleSheet } from 'react-native';

import SwitchToggle from '../components/element/SwitchToggle';
//import Inputs from '../components/element/TextInput';
import RemindItem from '../components/element/modify/RemindItem';
import ListItem from '../components/element/modify/RemindItemList';
import App from '../components/element/test';
import { Text, View } from '../components/Themed';
import { searchText, post, postForm, NotificationItem, postItem, reminder, remindItem } from '../components/states/post-reducers.js';

import {Root} from 'native-base'
import {Container, Content} from 'native-base'
import PostList from '../components/element/modify/PostList.jsx';
import PostForm from '../components/element/modify/PostForm.jsx';
import PostItem from '../components/element/modify/PostItem.jsx';
import Today from '../components/element/modify/Today.jsx';
import PostMain from '../components/element/modify/MainPost.jsx';


export default function TabTwoScreen() {
  return (
    <PostMain/>
  );
}


/*
<PostForm/>
          <PostList/>
 <PostItem/>
*/

/**
 * <View style={styles.switchButton}>
          <Text>Vibration</Text>
          <SwitchToggle/></View>
 */