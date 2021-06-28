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
        let iconColor = isPersonal ? 'darkturquoise' : 'lightskyblue';
        console.log(reminding);
        if (reminding != undefined) {
            if (reminding.length) {
                const itemTableHead = <Text style={{ textAlign: 'center' }}>ItemName Notify as Leaving Entering</Text>
                //console.log(reminding);
                const itemTableBody = reminding.map(item => (
                    //console.log(item)
                    <View key={item.id} style={styles.itemStyle}>
                        <Text style={{ width: 115 }}>{item.Name}</Text>
                        <Text>{item.leaving ? 'V' : 'X'}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {item.entering ? 'V' : 'X'}</Text>
                    </View>
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
            <View style={styles.container}>
                <View style={styles.horizontal}>
                    <Pressable style={[styles.collapsebutton, { backgroundColor: iconColor }]} onPress={this.handleOpen}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.headerText}>{header}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={styles.headerText}>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</Text>
                        </View>
                    </Pressable>

                    <TouchableOpacity style={[styles.buttonStyle]} onPress={this.handleX}>
                        <Text style={styles.headerText}>X</Text>
                    </TouchableOpacity>
                </View>
                <Collapsible collapsed={!(this.props.isOpen)}>
                    <View style={[styles.itemTableStyle]}>{itemTable}</View>
                </Collapsible>
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

export default connect((state, ownProps) => ({
    isOpen: state.postItem.isOpen[ownProps.id] ? true : false
}))(PostItem);


const styles = StyleSheet.create({
    buttonStyle: {
        flex: 0.15,
        backgroundColor: '#ff0000',
        flexDirection: 'column',
        borderTopRightRadius: 5,
        justifyContent: 'center'
    },
    collapsebutton: {
        flex: 0.85,
        flexDirection: 'column',
        borderWidth: 0,
        borderTopLeftRadius: 5,

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 0,
        margin: 1,
        backgroundColor: 'transparent',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: 'center'

    },
    itemTableStyle: {
        backgroundColor: 'lightgray',
        flex: 1,
        borderWidth: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center'
    },
    itemStyle: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 18,
    }
})