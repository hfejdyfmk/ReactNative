import React, { Component } from 'react'
import {
    Button,
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createRemindItem, listRemindItem } from '../../states/post-actions.js';
import RemindItem from './RemindItem';

class ListItem extends Component {

    static propTypes = {
        remindItems: PropTypes.array,
        deleteNotify: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.CreateItem = this.CreateItem.bind(this);
        //this.saveWholeList = this.saveWholeList.bind(this);
        //this.refupdate = this.refupdate.bind(this);
        //this.itemEls = [];
        //this.ri = [];
        //this.itemRefs = useRef([]);
    }

    render() {
        let { remindItems } = this.props;
        if (!remindItems) remindItems = [];

        let children = (
            <View>
                <Text style={{ textAlign: 'center', justifyContent: 'center' }}>No item here. Go add some items.</Text>
            </View>
        );

        //console.log(remindItems.length);
        if (remindItems.length) {
            children = remindItems.map((r) => (
                <RemindItem key={r.id} {...r} />
            ));
        }
        //console.log(this.itemELs);
        //this.refupdate();
        //console.log(typeof({children}))



        return (
            <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                <View style={styles.container}>
                    <Text style={styles.Lable}>Reminding Items: &nbsp;</Text>
                    <Button
                        title="Add Item"
                        onPress={this.CreateItem}
                    />
                </View>
                <View>
                    {children}
                </View>
            </View>
        )
    }
    componentDidMount() {
        const childRef = () => this.props;
        childRef(this);
    }
    componentWillUnmount() {
        const childRef = () => this.props;
        childRef(undefined);
    }

    CreateItem() {
        this.props.dispatch(createRemindItem('na', 'na'));
        this.props.dispatch(listRemindItem());
        //this.refupdate();
    }

    // refupdate() {
    //     for (let i = 0; i < this.itemEls.length; i++) {
    //         if (this.itemEls[i] == undefined) {
    //             //console.log('Find undefined');
    //             this.itemEls.splice(i, 1);
    //         } else {
    //             //console.log(this.props.deleteNotify);
    //             if (this.props.deleteNotify == this.itemEls[i].props.id) {
    //                 this.itemEls.splice(i, 1);
    //             }
    //         }
    //     }
    // }

    // saveWholeList() {
    //     let len = this.props.remindItems.length;
    //     let save = true;
    //     //console.log(bad);
    //     for (let i = 0; i < len; i++) {
    //         if (this.itemEls[i] != undefined) {
    //             if (!this.itemEls[i].saveItem()) {   //false -> fail
    //                 save = false;
    //             }
    //         }//else{
    //         //console.log('Undefined Occurs!!');
    //         //}
    //     }
    //     if (save) {
    //         this.itemEls = [];
    //     }
    //     return save; //true -> success
    // }




    handleItermName = (text) => {  //(1)????????????
        this.setState({ itemName: text })
    }

    checkItermName = (itemName) => {  //(1)
        if (itemName == '') alert('no empty')
    }

}

//export default ListItem


export default connect((state) => ({
    remindItems: state.reminder.items,
    deleteNotify: state.reminder.deleteNotify
    //saveAll: state.reminder.saveAll
}))(ListItem);


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
    submitButtonText: {
        color: 'white',
    },
    item: {
        padding: 5,
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
    Lable: {
        textAlign: 'center',
        fontSize: 20,
        justifyContent: 'center',
        paddingTop: 0,
        paddingHorizontal: 2,
    },
})
