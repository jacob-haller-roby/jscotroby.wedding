import React, {Component} from 'react';
import {connect} from 'react-redux'
import {login, logout} from '../redux/Actions';
import {isLoggedIn, selectCurrentUser} from "../redux/Selectors";
import Button from '../components/Button';
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();

class Btn extends Component {
    render() {
        return (
            <div {...this.props}/>
        )
    }
}

class Identity extends Component {

    componentDidMount() {
        let currentUser = netlifyIdentity.currentUser();
        if (currentUser) {
            this.props.login(currentUser);
        }
        netlifyIdentity.on('login', (user) => this.login(user));
        netlifyIdentity.on('logout', () => this.props.logout());
    }

    open() {
        netlifyIdentity.open();
    }

    logout() {
        netlifyIdentity.logout();
    }

    login(user) {
        this.props.login(user);
        setTimeout(() => {
            console.log('closing');
            netlifyIdentity.close();
        }, 1375);
    }

    render() {
        return this.props.isLoggedIn ? this.renderLogoutButton() : this.renderLoginButton();
    }

    renderLoginButton() {
        return (
            <Button onClick={this.open}>Login</Button>
        )
    }

    renderLogoutButton() {
        return <div>
            <p>Logged in as {this.props.user.user_metadata.full_name}</p>
            <Button onClick={this.logout}>Logout</Button>
        </div>
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