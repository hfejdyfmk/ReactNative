import React, { Component, useState } from 'react'
import { FlatList, SafeAreaView, StatusBar,View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

const DATA = [
   {
     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
     title: "Entering",
   },
   {
     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
     title: "Leaving",
   },
 ];
 
 const Item = ({ item, onPress, backgroundColor, textColor }) => (
   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
     <Text style={[styles.title, textColor]}>{item.title}</Text>
   </TouchableOpacity>
 );

 const EnterAndLeave = () => {
   const [selectedId, setSelectedId] = useState(null);
 
   const renderItem = ({ item }) => {
      //const backgroundColor = item.isSelect ? "#0000ff" : "#4A4444";
     const backgroundColor = item.id === selectedId ? "#0000ff" : "#4A4444";
     const color = item.id === selectedId ? 'white' : 'white';
 
     return (
       <Item
         item={item}
         onPress={() => setSelectedId(item.id)} // {item.isSelect = !item.isSelect}} //
         backgroundColor={{ backgroundColor }}
         textColor={{ color }}
       />
     );
   };
 
   return (
     <SafeAreaView style={styles.container}>
       <FlatList
         data={DATA}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         extraData={selectedId}
         horizontal = {true}
       />
     </SafeAreaView>
   );
 };

 

class Inputs extends Component {
   
   state = {
      email: '-2',
      password: '',
      itemName: '',
   }

   


   handleItermName = (text) => {  //(1)不同寫法
    this.setState({ itemName: text })
   }

   checkItermName = (itemName) => {  //(1)
      if(itemName=='') alert('no empty')
   }

   render() {
      return (
         <View style = {styles.container}>
            <TouchableOpacity
               style = {styles.deleteButton}
               onPress = {
                  () => this.checkItermName(this.state.itemName) //(1)
               }>
               <Text style = {styles.submitButtonText}> Delete </Text>
            </TouchableOpacity>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "  Iterm Name"
               placeholderTextColor = "#4A4444"
               autoCapitalize = "none"

                // (1)
               onChangeText = {this.handleItermName}/> 
            <EnterAndLeave/>
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