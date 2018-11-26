import React, {Component} from 'react';
import {connect} from 'react-redux'
import {checkLoginStatus, login, logout} from '../redux/Actions';
import {isLoggedIn, selectCurrentUser} from "../redux/Selectors";
import Button from '../components/Button';
import LoginDialog from '../components/LoginDialog';

class Identity extends Component {

    constructor(props) {
        super(props);
        props.checkLoginStatus();
        this.state = {
            open: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.isOpen = this.isOpen.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    isOpen() {
        return this.state.open && !this.props.isLoggedIn;
    }

    render() {
        return (
            <div>
                {this.renderButton()}
                <LoginDialog login={this.props.login}
                             open={this.isOpen()}
                             onClose={this.handleClose}/>
            </div>
        )
    }

    renderButton() {
        return this.props.isLoggedIn ? this.renderLogoutButton() : this.renderLoginButton();
    }

    renderLoginButton() {
        return (
            <Button onClick={this.handleOpen}>Login</Button>
        )
    }

    renderLogoutButton() {
        return <div>
            <p>Logged in as {this.props.user.user_metadata.full_name}</p>
            <Button onClick={this.props.logout}>Logout</Button>
        </div>
    }

};

export default connect(
    (state) => ({
        user: selectCurrentUser(state),
        isLoggedIn: isLoggedIn(state)
    }),
    (dispatch) => ({
        login: (email, password) => dispatch(login(email, password)),
        logout: () => dispatch(logout()),
        checkLoginStatus: () => dispatch(checkLoginStatus())
    })
)(Identity);