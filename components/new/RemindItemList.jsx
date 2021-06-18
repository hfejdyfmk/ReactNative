import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { createRemindItem, listRemindItem } from '../states/post-actions.js';
//import { getMoodIcon } from 'utilities/weather.js';

//import './RemindItemList.css';
import RemindItem from './RemindItem.jsx';

class ListItem extends React.Component {
    static propTypes = {
        remindItems: PropTypes.array,
        deleteNotify: PropTypes.string,
        dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.CreateItem = this.CreateItem.bind(this);
        this.saveWholeList = this.saveWholeList.bind(this);
        this.refupdate = this.refupdate.bind(this);
        this.itemEls = [];
        //this.ri = [];
        //this.itemRefs = useRef([]);
    }

    render() {
        let { remindItems } = this.props;
        if (!remindItems) remindItems = [];

        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No item here. Go add some items.</div>
            </ListGroupItem>
        );
        //console.log(remindItems.length);
        if (remindItems.length) {
            children = remindItems.map((r) => (
                <ListGroupItem key={r.id} action>
                    <RemindItem itemRef={ref => (this.itemEls.push(ref))} {...r} />
                </ListGroupItem>
            ));
        }
        //console.log(this.itemELs);
        this.refupdate();
        return (
            <div className='reminditem-list'>
                <div className='remind-nav'>Reminding Items: &nbsp;<Button onClick={this.CreateItem}>Add Item</Button></div>
                <ListGroup>
                    {children}
                </ListGroup>
            </div>
        );
    }
    componentDidMount() {
        const { childRef } = this.props;
        childRef(this);
    }
    componentWillUnmount() {
        const { childRef } = this.props;
        childRef(undefined);
    }

    CreateItem() {
        this.props.dispatch(createRemindItem('na', 'na'));
        this.props.dispatch(listRemindItem());
        //this.refupdate();
    }

    refupdate() {
        for (let i = 0; i < this.itemEls.length; i++) {
            if (this.itemEls[i] == undefined) {
                //console.log('Find undefined');
                this.itemEls.splice(i, 1);
            } else {
                //console.log(this.props.deleteNotify);
                if (this.props.deleteNotify == this.itemEls[i].props.id) {
                    this.itemEls.splice(i, 1);
                }
            }
        }
    }

    saveWholeList() {
        let len = this.props.remindItems.length;
        let save = true;
        //console.log(bad);
        for (let i = 0; i < len; i++) {
            if (this.itemEls[i] != undefined) {
                if (!this.itemEls[i].saveItem()) {   //false -> fail
                    save = false;
                }
            }//else{
            //console.log('Undefined Occurs!!');
            //}
        }
        if (save) {
            this.itemEls = [];
        }
        return save; //true -> success
    }

}


export default connect((state) => ({
    remindItems: state.reminder.items,
    deleteNotify: state.reminder.deleteNotify
    //saveAll: state.reminder.saveAll
}))(ListItem);
