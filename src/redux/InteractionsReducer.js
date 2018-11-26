import ActionTypes from './ActionTypes.js';

let initialState = {
    submissions: [],
    forms: [],
    submissions_received: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LIST_FORMS:
            return Object.assign({}, state, {forms: action.forms});
        case ActionTypes.LIST_SUBMISSIONS:
            let submissions = {};
            submissions[action.form_id] = action.submissions;
            return Object.assign({}, state, {submissions});
        case ActionTypes.SUBMISSIONS_RECEIVED:
            return Object.assign({}, state, {submissions_received: true});
        default:
            return state;
    }
};
