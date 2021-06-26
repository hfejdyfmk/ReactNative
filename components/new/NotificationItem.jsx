import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';
import {
    Message,
    Avatar,
} from "@chatscope/chat-ui-kit-react";
import './NotificationItem.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { createCheck } from 'states/post-actions.js';

class NotificationItem extends React.Component {
    static PropTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        item: PropTypes.string,
        mode: PropTypes.string,
        text: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        /*this.state = {
            check: false,
        }*/
        this.handleCheck = this.handleCheck.bind(this);

    }

    render() {
        console.log(this.props);
        const { id, reminding, ts } = this.props;
        var str = "";
        for (let t of reminding) {
            str += t.Name + "\n";
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <Message className="row-6" model={`${str}`}>
                        <Message.Footer sender={`${""}`} sentTime={`${moment(ts * 1000).calendar()}`} />
                        <Message.TextContent text={`${str}`} />
                    </Message>
                    <ToggleButton className="row-6" selected={this.props.checked} onChange={this.handleCheck}>
                        <CheckIcon />
                        <p>test</p>
                    </ToggleButton>
                </div>
            </div >
        );
    }

    handleCheck() {
        /*this.setState((prevState, props) => ({
            check: !prevState.check
        }));*/
        this.props.dispatch(createCheck(this.props.id));
    }

}

export default connect((state, ownProps) => ({
}))(NotificationItem);
