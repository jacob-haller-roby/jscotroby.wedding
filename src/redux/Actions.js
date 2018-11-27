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

console.log(process.env);
const client = new NetlifyAPI(process.env.REACT_APP_NETLIFY_API_KEY);
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

        dispatch({
            type: ActionTypes.FETCHING_SUBMISSIONS
        });

        let deletionPromises = [];
        Object.values(previousRSVPs).forEach(submission => {
            deletionPromises.push(
                client.deleteSubmission({submission_id: submission.id})
            );
        });

        let submissionPromises = [];
        Object.values(RSVPs).forEach(values => {
            submissionPromises.push(
                fetch("/", {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: encode({"form-name": "rsvp", ...values, user_id})
                })
            );
        });

        let promises = deletionPromises.concat(submissionPromises);

        return Promise.all(promises)
            .then(() => dispatch(listFormSubmissions(RSVP_FORM_ID))
                .then(() => dispatch({type: ActionTypes.SUBMISSIONS_RECEIVED}))
            )

    }
}