import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink
} from 'reactstrap';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import { Provider } from 'react-redux';
import { listPosts } from '../states/post-actions';
import Notification from 'components/Notification.jsx';
import Today from 'components/Today.jsx';
import Setting from 'components/setting.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            placeToggle: false,
            navbarToggle: false,
            searchText: ''
        };
        this.store = null;
        this.searchEl = null;

        this.handlePlaceToggle = this.handlePlaceToggle.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentWillMount() {

    }

    /*componentDidMount() {
        console.log("aaaa");
        this.props.dispatch(listPosts());
    }*/

    render() {
        return (
            <Router>
                <div className='main'>
                    <div className='Nav bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light expand>
                                <NavbarToggler onClick={this.handleNavbarToggle} />
                                <Collapse isOpen={this.state.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/'>Notification</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/today'>place</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/setting'>Setting</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>
                </div>
                <Route exact path="/" render={() => (
                    <Notification />
                )} />
                <Route exact path="/today" render={() => (
                    <Today searchText={this.state.searchText} />
                )} />
                <Route exact path="/setting" render={() => (
                    <Setting />
                )} />
            </Router>
        );
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handlePlaceToggle() {
        this.setState((prevState, props) => ({
            placeToggle: !prevState.placeToggle
        }));
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.setState({
                searchText: e.target.value
            });
        }
    }

    handleClearSearch() {
        this.setState({
            searchText: ''
        });
        this.searchEl.value = '';
    }
}
/*
<Dropdown direction="down" isOpen={this.state.placeToggle}>
    <DropdownToggle caret onClick={this.handlePlaceToggle}>
        Place
        </DropdownToggle>
            <DropdownMenu>
        <DropdownItem tag={Link} to='/'>General Place</DropdownItem>
    <DropdownItem tag={Link} to='/forecast'>Personal Place</DropdownItem>
        </DropdownMenu>
</Dropdown>
*/