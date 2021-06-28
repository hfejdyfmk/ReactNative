import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { StyleSheet, View, Text } from 'react-native';
import ThreeDots from './ThreeDots.tsx'
import NotificationItem from './NotificationItem.tsx'
import { listNotification } from '../../states/post-actions.js';


class NotificationList extends React.Component {
    static PropTypes = {
        posts: PropTypes.array,
        hasMore: PropTypes.bool,
        searchText: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.props.dispatch(listNotification(122.2, 23.51));
        //this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        let { posts } = this.props;
        if (!posts) posts = [];
        //console.log(posts);
        /*let children = (
            <ViewItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No post here.<br />Go add some posts.</div>
            </ListGroupItem>
        );*/
        let children = (<Text>No Notificaiton</Text>);
        if (posts.length) {
            console.log(posts.length);
            children = posts.map(p => (
                <View key={p.id}>
                    <NotificationItem {...p} />
                </View>
            ));
        }

        return (
            <View style={{ flexDirection: "column", justifyContent: 'center' }}>
                <ThreeDots />
                <View>
                    {children}
                </View>
            </View>
        );
    }

    // handleScroll(page) {
    //     //const { posts, searchText } = this.props;
    //     //console.log("ss");
    //     //this.props.dispatch(listMorePosts(searchText, posts[posts.length - 1].id));
    // }
}

export default connect(state => ({
    posts: state.post.posts,
    hasMore: state.post.hasMore,
    searchText: state.searchText
}))(NotificationList);