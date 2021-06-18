import React, { Component, useState, useEffect, useRef } from 'react'
import { Button, FlatList, SafeAreaView, StatusBar,View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createRemindItem, listRemindItem } from '../states/post-actions.js';
import RemindItem from './modify/RemindItem';
import moment from 'moment';
import { getMoodIcon } from '../utilities/weather.js';
import { deletePost, setIsOpen, OpenCard } from '../states/post-actions.js';
import { List } from 'react-native-paper';

const Accordion = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (

    /*
    <div>{header}</div>
        <div>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</div>
    <Button className='deletebtn' size='sm' color='danger' onClick={this.handleX}>X</Button>
    */
    <List.Section title="Accordions">
      <List.Accordion
        title = "test"
        left={props => <List.Icon {...props} icon="folder" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

    </List.Section>
  );
};



class Inputs extends Component {
  
  static state = {
    id: '',
    Name: '',
    locationType: '',
    reminding: [],
    volume: '',
    vibrate: false,
    isOpen: false,
    isPersonal: false,  
   }

   constructor(props) {
    super(props);

    //this.handleClick = this.handleClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleX = this.handleX.bind(this);
  }

   render() {
    const { id, Name, isPersonal, volume, vibrate, isOpen, locationType } = this.props;
    let { reminding } = this.props;
    let itemTable = undefined;
    let header = isPersonal ? Name : locationType
    let iconColor = isPersonal ? 'primary' : 'info';
    console.log(reminding);

    

    
    if (reminding && reminding.length) { //cannot be undefined
            const itemTableHead = (
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
            //console.log(reminding);
            const itemTableBody = reminding.map(item => (
                <View style={styles.container}>
                  <FlatList
                    key={item.id}
                    data={[
                      {key: item.Name},
                      {key: item.leaving ? 'V' : 'X'},
                      {key: item.entering ? 'V' : 'X'},
                    ]}
                    horizontal = {true}
                    renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                  />
                </View>
                
            ));
            //console.log(itemTableBody);

            itemTable = (
                <View >
                    <View>{itemTableHead}</View>
                    <View>{itemTableBody}</View>
                </View>
            );
  
        }
    
      
      let vibtext = vibrate ? 'on' : 'Off';

      return (
        <View style = {styles.container}>
          <Accordion/>   
        </View>
      )
   }

   

   handleOpen() {
    this.props.dispatch(OpenCard(this.props.id));
    }

    handleX() {
        this.props.dispatch(deletePost(this.props.id));
    }

}

export default Inputs



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
   deleteButton: {
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