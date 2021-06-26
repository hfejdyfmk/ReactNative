import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

class Inputs extends Component {
   state = {
      email: '',
      password: '',
      itemName: '',
   }
   





   handleItermName = (text) => {
    this.setState({ itemName: text })
   }

   login = (email, pass) => {
      alert('email: ' + email + ' password: ' + pass)
   }
   render() {
      return (
         <View style = {styles.container}>
            <TouchableOpacity
               style = {styles.deleteButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Delete </Text>
            </TouchableOpacity>

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
            
         </View>
      )
   }
}

export default Inputs



const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
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
   }
})