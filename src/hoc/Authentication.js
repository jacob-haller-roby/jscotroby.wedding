import React, {Component} from 'react';
import {connect} from 'react-redux'
import {checkLoginStatus, login, logout} from '../redux/Actions';
import {isLoggedIn, selectCurrentUser} from "../redux/Selectors";


const Wrapper = (Component) => {
    return class WrapperClass extends Component {
        constructor(props) {
            super(props);
            props.checkLoginStatus();
        }

        render() {
            return <Component {...this.props}/>;
        }
    }
};


export default (WrappedComponent) => connect(
    (state) => ({
        user: selectCurrentUser(state),
        isLoggedIn: isLoggedIn(state)
    }),
    (dispatch) => ({
        login: (email, password) => dispatch(login(email, password)),
        logout: () => dispatch(logout()),
        checkLoginStatus: () => dispatch(checkLoginStatus())
    })
)(Wrapper(WrappedComponent));