import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { listPosts, createVote, listRemindItem, setAdd } from '../../states/post-actions.js';
import { Ionicons } from 'react-native-vector-icons'
import PostForm from './PostForm.jsx';
import PostList from './PostList.jsx';

import {
    Button,
} from 'native-base'
import Collapsible from 'react-native-collapsible';
import { StyleSheet, Text, View } from "react-native";

class Today extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        code: PropTypes.number,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        searchText: PropTypes.string,
        postLoading: PropTypes.bool,
        posts: PropTypes.array,
        isAdd: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        //this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.props.dispatch(listPosts(this.props.searchText));
        this.props.dispatch(listRemindItem());
        //console.log(this.props.searchText);
    }

    componentWillUnmount() {
        if (this.props.weatherLoading) {
            //cancelWeather();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listPosts(nextProps.searchText));
        }
    }

    render() {
        const { city, isAdd, group, description, temp, unit, masking, postLoading } = this.props;

        //document.body.className = `weather-bg ${group}`;
        //document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;
        //console.log(document.querySelector('.weather-bg .mask').className);
        let AddButtonColor = isAdd ? 'dodgerblue' : 'gray';
        let AddButtonText = isAdd ? 'Add One' : 'Cancel';
        /*return (
            <div>id</div>
            <View>
                <WeatherDisplay {...{ group, description, temp, unit, masking }} day='today' />
            </View>
        );*/

        return (
            <View>
                {/* <Button style={{ backgroundColor: AddButtonColor }} rounded onPress={this.handleToggle}><Text style={styles.addButton}>{AddButtonText}</Text></Button> */}
                <Ionicons.Button
                            name={'add-circle'}
                            color={AddButtonColor}
                            size={30}
                            onPress={this.handleToggle}
                            backgroundColor={'transparent'}
                />
                <Collapsible collapsed={isAdd}>
                    <PostForm />
                </Collapsible>
                <PostList />{
                    postLoading &&
                    <Text>Loading...</Text>
                }
            </View>
        );
    }

    handleToggle(e) {
        this.props.dispatch(setAdd());
    }
}

export default connect(state => ({
    ...state.weather,
    unit: state.unit,
    postLoading: state.post.postLoading,
    searchText: state.searchText,
    isAdd: state.postForm.add,
}))(Today);

const styles = StyleSheet.create({
    addButton: {
        color: 'white',
    },
})