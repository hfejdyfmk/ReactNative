import React from 'react';
import PropTypes from 'prop-types';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckIcon from '@material-ui/icons/Check';
import { listPosts } from '../states/post-actions';
import './ThreeDots.css';

class ThreeDots extends React.Component {
    static PropTypes = {
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            threeDotsToggle: false,
            checkToggle: false,
            dayToggle: false,
            weekToggle: false,
            monthToggle: false,
            anchorEl: null,
        }
        this.handleThreeDotsToggle = this.handleThreeDotsToggle.bind(this);
        this.handleCheckToggle = this.handleCheckToggle.bind(this);
        this.handleDayToggle = this.handleDayToggle.bind(this);
        this.handleWeekToggle = this.handleWeekToggle.bind(this);
        this.handleMonthToggle = this.handleMonthToggle.bind(this);
    }

    render() {

        return (
            <Dropdown direction="down" isOpen={this.state.threeDotsToggle}>
                <DropdownToggle>
                    <IconButton onClick={this.handleThreeDotsToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </DropdownToggle>
                <DropdownMenu>
                    <Dropdown direction="down" isOpen={this.state.checkToggle}>
                        <ToggleButton selected={this.state.checkToggle} onChange={this.handleCheckToggle}>
                            <CheckIcon />
                        </ToggleButton>
                        <DropdownToggle>
                            <DropdownItem>Checked</DropdownItem>
                        </DropdownToggle>
                    </Dropdown>
                    <Dropdown direction="down" isOpen={this.state.dayToggle}>
                        <ToggleButton selected={this.state.dayToggle} onChange={this.handleDayToggle}>
                            <CheckIcon />
                        </ToggleButton>
                        <DropdownToggle>
                            <DropdownItem>Day</DropdownItem>
                        </DropdownToggle>
                    </Dropdown>
                    <Dropdown direction="down" isOpen={this.state.weekToggle}>
                        <ToggleButton selected={this.state.weekToggle} onChange={this.handleWeekToggle}>
                            <CheckIcon />
                        </ToggleButton>
                        <DropdownToggle>
                            <DropdownItem>Week</DropdownItem>
                        </DropdownToggle>
                    </Dropdown>
                    <Dropdown direction="down" isOpen={this.state.monthToggle}>
                        <ToggleButton selected={this.state.monthToggle} onChange={this.handleMonthToggle}>
                            <CheckIcon />
                        </ToggleButton>
                        <DropdownToggle>
                            <DropdownItem>Month</DropdownItem>
                        </DropdownToggle>
                    </Dropdown>
                </DropdownMenu>
            </Dropdown>
        );
    }
    /*

    */
    handleThreeDotsToggle() {
        this.setState((prevState, props) => ({
            threeDotsToggle: !prevState.threeDotsToggle
        }));
    }

    handleCheckToggle() {
        this.setState((prevState, props) => ({
            checkToggle: !prevState.checkToggle
        }));
        if (this.state.checkToggle) {
            this.dispatch(listPosts('checked'));
        }
        else {
            this.dispatch(listPosts());
        }
    }

    handleDayToggle() {
        this.setState((prevState, props) => ({
            dayToggle: !prevState.dayToggle
        }));
        if (this.state.dayToggle) {
            this.dispatch(listPosts('day'));
        }
        else {
            this.dispatch(listPosts());
        }
    }

    handleWeekToggle() {
        this.setState((prevState, props) => ({
            weekToggle: !prevState.weekToggle
        }));
        if (this.state.weekToggle) {
            this.dispatch(listPosts('week'));
        }
        else {
            this.dispatch(listPosts());
        }
    }

    handleMonthToggle() {
        this.setState((prevState, props) => ({
            monthToggle: !prevState.monthToggle
        }));
        if (this.state.weekToggle) {
            this.dispatch(listPosts('month'));
        }
        else {
            this.dispatch(listPosts());
        }
    }
}

export default connect(state => ({
}))(ThreeDots);
