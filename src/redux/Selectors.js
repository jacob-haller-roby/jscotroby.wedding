import {RSVP_FORM_ID} from "../constants";

export function isLoggedIn(state) {
    return !!state.identity.user;
}

export function selectCurrentUser(state) {
    return state.identity.user;
}

export function selectCurrentUserFormSubmissions(state) {
    let submissions = {};
    let user_id = state.identity.user.id;
    Object.keys(state.interactions.submissions).forEach(key => {
        submissions[key] = state.interactions.submissions[key].filter(submission => submission.data.user_id === user_id);
    });
    return submissions;
}

export function selectCurrentUserRSVPs(state) {
    if (!state.identity.user || !state.interactions.submissions[RSVP_FORM_ID]) {
        return [];
    }
    let user_id = state.identity.user.id;
    return state.interactions.submissions[RSVP_FORM_ID].filter(submission => submission.data.user_id === user_id);
}

export function areSubmissionsReceived(state) {
    return state.interactions.submissions_received;
}