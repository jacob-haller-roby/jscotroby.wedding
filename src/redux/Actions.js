import ActionTypes from './ActionTypes';
import GoTrue from "gotrue-js";
import NetlifyAPI from "netlify";
import {selectCurrentUser, selectCurrentUserRSVPs} from "./Selectors";
import {RSVP_FORM_ID} from "../constants";
import {encode} from "../utils/forms";

// Instantiate the GoTrue auth client with an optional configuration

const auth = new GoTrue({
    APIUrl: "https://www.jadeandjake.wedding/.netlify/identity",
    audience: "",
    setCookie: true
});

const client = new NetlifyAPI('a27f49c094e7a45bd4d27eb31aec892e85c0b06650a669a91a79d7a8cd860101');
console.log(client);

export function checkLoginStatus() {
    return (dispatch) => {
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
    return (dispatch) => auth.login(email, password, true)
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

export function listForms() {
    return (dispatch) => {
        return client.listForms()
            .then(
                (forms) => {
                    dispatch({
                        type: ActionTypes.LIST_FORMS,
                        forms
                    });
                    return forms;
                }
            ).then((forms) => {
                let promises = [];
                forms.forEach(
                    form => promises.push(dispatch(listFormSubmissions(form.id)))
                );
                return Promise.all(promises);
            })
            .then(() => dispatch({type: ActionTypes.SUBMISSIONS_RECEIVED}));
        ;
    }
}

export function listFormSubmissions(form_id) {
    return (dispatch) => {

        return client.listFormSubmissions({form_id})
            .then(
                (submissions) =>
                    dispatch({
                        type: ActionTypes.LIST_SUBMISSIONS,
                        submissions,
                        form_id
                    })
            );
    }
}

export function submitRSVP(RSVPs) {
    return (dispatch, getState) => {
        let state = getState();
        let previousRSVPs = selectCurrentUserRSVPs(state);
        let user_id = selectCurrentUser(state).id;
        let promise = Promise.resolve();
        console.log(previousRSVPs);
        Object.values(previousRSVPs).forEach(submission => {
            promise.then(
                () => client.deleteSubmission({submission_id: submission.id})
            );
            promise.then((deletion) => console.log('deleted: ', deletion))
        });

        Object.values(RSVPs).forEach(values => {
            console.log(values);
            promise.then(
                () => fetch("/", {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: encode({"form-name": "rsvp", ...values, user_id})
                })
            );
            promise.then((addition) => console.log('added: ', addition))
        });

        promise.then(() => dispatch(listFormSubmissions(RSVP_FORM_ID)));
    }
}