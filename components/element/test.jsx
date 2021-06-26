import React, { Component, useState, useEffect, useRef } from 'react'
import { Button, FlatList, SafeAreaView, StatusBar,View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { listPosts, createPost, createVote,  listRemindItem, setAdd } from '../states/post-actions.js';
import Collapsible from 'react-native-collapsible';

//testing
import RemindItem from './modify/RemindItem';

import moment from 'moment';
import { getMoodIcon } from '../utilities/weather.js';
import { deletePost, setIsOpen, OpenCard } from '../states/post-actions.js';
import { List } from 'react-native-paper';

//import { listPosts, createPost, createVote, listRemindItem, setAdd } from '../states/post-actions.js';
/*
import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import { cancelWeather } from 'api/open-weather-map.js';
import { getWeather } from 'states/weather-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';
*/

/*
note: class name和export connect要改名字
*/


class Inputs extends Component {

  static propTypes = {
    city: PropTypes.string,
    code: PropTypes.number,
    group: PropTypes.string,
    description: PropTypes.string,
    temp: PropTypes.number,
    unit: PropTypes.string,
    weatherLoading: PropTypes.bool,
    masking: PropTypes.bool,
    searchText: PropTypes.string,
    postLoading: PropTypes.bool,
    posts: PropTypes.array,
    isAdd: PropTypes.bool,
    dispatch: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
}
/*  
componentDidMount() {
  this.props.dispatch(getWeather('Hsinchu', this.props.unit));
  this.props.dispatch(listPosts(this.props.searchText));
  this.props.dispatch(listRemindItem());
  //console.log(this.props.searchText);
}

componentWillUnmount() {
  if (this.props.weatherLoading) {
      cancelWeather();
  }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.searchText !== this.props.searchText) {
      this.props.dispatch(listPosts(nextProps.searchText));
  }
}*/


   render() {
    const { city, isAdd, group, description, temp, unit, masking, postLoading } = this.props;
    let AddButtonColor = isAdd ? 'secondary' : 'primary';
    let AddButtonText = isAdd ? 'Cancel' : 'Add One';
  
      return (
        <View style = {styles.container}>

      <Button
        color="#f194ff"
        title={AddButtonText}
        onPress={this.handleToggle}
      />
      <Collapsible collapsed={isAdd}>
        <Text>hiiiii</Text>
        <RemindItem/>
      </Collapsible>
                    
        </View>
      )
   }

   handleToggle(e) {
    this.props.dispatch(setAdd());
  }

  

}


export default connect(state => ({
    ...state.weather,
    unit: state.unit,
    postLoading: state.post.postLoading,
    searchText: state.searchText,
    isAdd: state.postForm.add,
}))(Inputs);


const styles = StyleSheet.create({
   container: {
    flexDirection: "column",
    padding: 20,
   },
   input: {
      margin: 15,
      borderColor: '#4A4444',
      borderWidth: 1,
      marginRight: 0,
      marginLeft: 0,
   },
   Button: {
    backgroundColor: '#ff0000',
    padding: 10,
    margin: 15,
    height: 40,
    marginRight: 0,
    marginLeft: 0,
    },
    enterANDleavingButton: {
      backgroundColor: '#4A4444',
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
    },
    onPressedButton: {
      backgroundColor: '#0000ff',
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
    },
   submitButtonText:{
      color: 'white',
   },
   item: {
      padding: 10,
      margin: 15,
      height: 40,
      marginRight: 0,
      marginLeft: 0,
    //  marginVertical: 8,
   //   marginHorizontal: 16,
    },
    title: {
      fontSize: 12,
    },
})

/*
<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Iterm Name"
               placeholderTextColor = "#4A4444"
               autoCapitalize = "none"
               onChangeText = {this.handleItermName}/>
            <TouchableOpacity
               style = {styles.enterANDleavingButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Entering </Text>
            </TouchableOpacity>

            
            <TouchableOpacity
               style = {styles.enterANDleavingButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Leaving </Text>
            </TouchableOpacity>
*/

/*
const FlatListTitle = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Item'},
          {key: 'Notify \nWhen: '},
          {key: 'Leaving'},
          {key: 'Entering'},
        ]}
        horizontal = {true}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}
*/