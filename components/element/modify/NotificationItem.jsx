import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {View, Text} from '../../Themed'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native';

const ICON_SIZE = 20;
const messages= [
    {
        _id: 1,
        text: 'purse, phone!',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
    }
];

class NotificationItem extends React.Component{
    static PropTypes= {
    };

    constructor(props) {
        super(props);
        this.state= {
            isCheckedEnabled: false,
        }
        this.setCheckedIcon= this.setCheckedIcon.bind(this);
    }

    setCheckedIcon = () => {
            this.setState({isCheckedEnabled: !this.state.isCheckedEnabled});
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.chat}>
                    <GiftedChat 
                        messages={messages}
                        //get rid of the typing box
                        minComposerHeight={0}
                        maxComposerHeight={0}
                        minInputToolbarHeight={0}
                        renderInputToolbar={() => null}
                        renderAvatar={()=> null}
                        renderDay={()=> null}
                    />
                </View>
                <View style={styles.message}>
                    <Text style={styles.location}>
                        geolocation
                    </Text>
                    <MaterialCommunityIcons.Button
                            name={this.state.isCheckedEnabled? 'check-circle': 'check-circle-outline'}
                            color={'grey'}
                            size={ICON_SIZE}
                            onPress={this.setCheckedIcon}
                            backgroundColor={'transparent'}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 222, 179, 1.0)',
        alignItems: 'flex-end'
    },
    chat:{
        flex: 2,
        backgroundColor: 'rgba(245, 222, 179, 1.0)',
        // backgroundColor: 'pink'
    },
    message: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 222, 179, 1.0)',
        marginLeft: 25,
        // backgroundColor: 'blue'
    },
    location: {
        color: 'grey',
        textAlignVertical: 'center',
        height: 35,
    }
})


export default connect(state => ({
}))(NotificationItem);
