import React from 'react';
import PropTypes from 'prop-types';
import {
    Toast,
    ToastHeader,
    ToastBody,
    Collapse,
    Button,
    Table,
    Card
} from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMoodIcon } from 'utilities/weather.js';
import { deletePost, setIsOpen, OpenCard } from 'states/post-actions.js';

import './PostItem.css';

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
        let iconColor = isPersonal ? 'primary' : 'info';
        console.log(reminding);
        if (reminding.length) {
            const itemTableHead = (
                <tr>
                    <th>Item</th>
                    <th>Notify When: </th>
                    <th>Leaving</th>
                    <th>Entering</th>
                </tr>
            );
            //console.log(reminding);
            const itemTableBody = reminding.map(item => (
                //console.log(item);
                <tr key={item.id}>
                    <td colSpan="2">{item.Name}</td>
                    <td>{item.leaving ? 'V' : 'X'}</td>
                    <td>{item.entering ? 'V' : 'X'}</td>
                </tr>
            ));
            //console.log(itemTableBody);
            itemTable = (
                <Table>
                    <thead>{itemTableHead}</thead>
                    <tbody>{itemTableBody}</tbody>
                </Table>
            );
        }

        let vibtext = vibrate ? 'on' : 'Off';

        return (
            <Toast>
                <ToastHeader className='header' onClick={this.handleOpen} icon={iconColor}>
                    <div>{header}</div>
                    <div>Vol:&nbsp;{volume}%&nbsp;,&nbsp;vibrate:&nbsp;{vibtext}</div>
                    <Button className='deletebtn' size='sm' color='danger' onClick={this.handleX}>X</Button>
                </ToastHeader>
                <Collapse isOpen={isOpen}>
                    <ToastBody>
                        {itemTable}
                    </ToastBody>
                </Collapse>
            </Toast>
        );
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
