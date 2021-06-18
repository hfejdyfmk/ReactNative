import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import ThreeDots from 'components/ThreeDots.jsx'
//import NotificationItem from 'components/NotificationItem.jsx'
import NotificationList from './NotificationList.jsx';
import { listPosts, listMorePosts } from '../states/post-actions';

class Notification extends React.Component {
    static PropTypes = {
        masking: PropTypes.bool,
        searchText: PropTypes.string,
        postLoading: PropTypes.bool,
        posts: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.searchText));
    }

    componentWillUnmount() { //render後  立即調用
        /*if (this.props.weatherLoading) {
            cancelWeather();
        }*/
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listPosts(nextProps.searchText));
        }
    }

    render() {
        const { masking, postLoading } = this.props;
        console.log(postLoading);
        console.log(listMorePosts);
        //document.body.className = `weather-bg ${group}`;
        //document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='today'>
                <div className='posts'>
                    <NotificationList />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    postLoading: state.post.postLoading,
    searchText: state.searchText,
}))(Notification);
