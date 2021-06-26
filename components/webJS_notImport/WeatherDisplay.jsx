import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    StyleSheet,
} from 'react-native'

export default class WeatherDisplay extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        group: PropTypes.string,
        description: PropTypes.string,
        temp: PropTypes.number,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View className={`weather-display ${this.props.masking
                ? 'masking'
                : ''}`}>
            </View>
        );
    }
}
