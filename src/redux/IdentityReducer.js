import ActionTypes from './ActionTypes.js';

let initialState = {
    user: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return Object.assign({}, state, {user: action.user});
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, {user: null});
        default:
            return state
    }
};
