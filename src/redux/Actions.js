import ActionTypes from './ActionTypes';
import GoTrue from "gotrue-js";

// Instantiate the GoTrue auth client with an optional configuration

const auth = new GoTrue({
    APIUrl: "https://www.jadeandjake.wedding/.netlify/identity",
    audience: "",
    setCookie: true
});

export function checkLoginStatus() {
    return (dispatch) => {

        console.log(auth);
        let user = auth.currentUser();
        if (user) {
            dispatch({
                type: ActionTypes.LOGIN,
                user
            });
        }
    }
}

export function login(email, password) {
    return (dispatch) => auth.login(email, password)
        .then((user) => dispatch({
                type: ActionTypes.LOGIN,
                user
            }),
            (error) => {
                console.log(error);
            });
}

export function logout() {
    return (dispatch) => auth.currentUser()
        .logout()
        .then(() => dispatch({
            type: ActionTypes.LOGOUT
        }));
}