import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Collapse } from 'reactstrap';
import { connect } from 'react-redux';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import { cancelWeather } from 'api/open-weather-map.js';
import { getWeather } from 'states/weather-actions.js';
import { listPosts, createPost, createVote, listRemindItem, setAdd } from 'states/post-actions.js';
import PostForm from 'components/PostForm.jsx';
import PostList from 'components/PostList.jsx';

import './Today.css';

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
        this.props.dispatch(getWeather('Hsinchu', this.props.unit));
        this.props.dispatch(listPosts(this.props.searchText));
        this.props.dispatch(listRemindItem());
        //console.log(this.props.searchText);
    }

    componentWillUnmount() {
        if (this.props.weatherLoading) {
            cancelWeather();
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
        let AddButtonColor = isAdd ? 'secondary' : 'primary';
        let AddButtonText = isAdd ? 'Cancel' : 'Add One';
        /*return (
            <div>id</div>
        );*/
        return (
            <div className='today'>
                <div className='weather'>
                    <WeatherDisplay {...{ group, description, temp, unit, masking }} day='today' />
                </div>
                <div className='posts'>
                    <h4 className='label'><i className='fa fa-paper-plane' aria-hidden="true"></i>&nbsp;&nbsp;Place</h4>
                    <Button color={AddButtonColor} onClick={this.handleToggle} style={{ marginBottom: '1rem' }}>{AddButtonText}</Button>
                    <Collapse isOpen={isAdd}>
                        <PostForm />
                    </Collapse>
                    <PostList />{
                        postLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
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
