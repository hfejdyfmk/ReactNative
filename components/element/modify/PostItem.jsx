import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button,
    Pressable,
} from 'react-native';

//import { Table, Row } from 'react-native-table-component';
import { connect } from 'react-redux';
//import moment from 'moment';

//import { getMoodIcon } from 'utilities/weather.js';
import { deletePost, setIsOpen, OpenCard } from '../../states/post-actions.js';

//import './PostItem.css';
//import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';
import Collapsible from 'react-native-collapsible';

class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        Name: PropTypes.string,
        locationType: PropTypes.string,
        reminding: PropTypes.array,
        volume: PropTypes.string,
        vibrate: PropTypes.bool,
        isOpen: PropTypes.bool,
        isPersonal: PropTypes.bool,
        dispatch: PropTypes.func
    };

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
        let iconColor = isPersonal ? 'dodgerblue' : 'darkturquoise';
        console.log(reminding);
        if (reminding != undefined) {
            if (reminding.length) {
                const itemTableHead = <Text>ItemName Notify as Leaving Entering</Text>
                //console.log(reminding);
                const itemTableBody = reminding.map(item => (
                    //console.log(item)
                    <Text>{item.name}{item.leaving ? 'V' : 'X'}{item.entering ? 'V' : 'X'}</Text>
                ));
                //console.log(itemTableBody);
                itemTable = (
                    <View>
                        {itemTableHead}
                        {itemTableBody}
                    </View>
                );
            }
        }

        let vibtext = vibrate ? 'on' : 'Off';

        return (
            <View>
            <View style = {styles.container}>
            
                <Pressable style={styles.collapsebutton} onPress={this.handleOpen}>
                    <View>
                        <Text>{header}</Text>
                        <Text>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</Text>
                    </View>
                </Pressable>
                
                
                <TouchableOpacity style={styles.buttonStyle} onPress={this.handleX}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>
           
            <Collapsible collapsed={this.props.isOpen}>
                <View>{itemTable}</View>
                <Text>Open</Text>
            </Collapsible>
            </View>
            /*
            <Collapse style={styles.container}>
                <View>
                <CollapseHeader isExpanded={this.props.isOpen} onToggle={this.handleOpen}>
                    <View>
                    <TouchableWithoutFeedback style={{ backgroundColor: { iconColor }, height: 1, width: 1 }} />
                    <Text>{header}</Text>
                    <Text>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</Text>
                    <TouchableOpacity style={styles.buttonStyle} onPress={this.handleX}>
                        <Text>X</Text>
                    </TouchableOpacity>
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    {itemTable}
                </CollapseBody>
                </View>
            </Collapse>*/
          
        )
    }

    handleOpen() {
        this.props.dispatch(OpenCard(this.props.id));
    }

    handleX() {
        this.props.dispatch(deletePost(this.props.id));
    }
}

export default connect((state, ownProps) => ({
    isOpen: state.postItem.isOpen[ownProps.id] ? true : false
}))(PostItem);


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#ff0000',
        padding: 10,
        margin: 15,
        height: 40,
        marginRight: 0,
        marginLeft: 0,
    },
    collapsebutton: {
        backgroundColor: '#55ff55',
        padding: 10,
        margin: 15,
        height: 40,
        marginRight: 0,
        marginLeft: 0,
    },
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
})