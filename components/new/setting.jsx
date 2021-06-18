import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap'; //改用material UI
import { connect } from 'react-redux';

class Setting extends React.Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        return (
            <div className='Setting'>
                <h1>This is Setting</h1>
            </div>
        );
    }
}

export default connect(state => ({

}))(Setting);