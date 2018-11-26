import React, {Component} from 'react';
import { connect } from 'react-redux'
import { login, logout } from '../redux/Actions';
import {isLoggedIn, selectCurrentUser} from "../redux/Selectors";
import Button from '@material-ui/core/Button';
import netlifyIdentity from 'netlify-identity-widget';
netlifyIdentity.init();

class Identity extends Component {

    componentDidMount() {
        netlifyIdentity.on('login', this.props.login);
        netlifyIdentity.on('logout', this.props.logout);
    }

    render() {
        return (this.props.isLoggedIn || netlifyIdentity.currentUser()) ? this.renderLogoutButton() : this.renderLoginButton();
    }

    renderLoginButton() {
        return (
            <Button onClick={() => netlifyIdentity.open()}>Login</Button>
        )
    }

    renderLogoutButton() {
        return <Button onClick={() => netlifyIdentity.logout()}>Logout</Button>
    }

};

export default connect(
    (state) => ({
        user: selectCurrentUser(state),
        isLoggedIn: isLoggedIn(state)
    }),
    (dispatch) => ({
        login: (user) => dispatch(login(user)),
        logout: () => dispatch(logout())
    })
)(Identity);