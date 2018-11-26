import ActionTypes from './ActionTypes.js';

let initialState = {
    user: null
};


export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            console.log(action.user);
            state.user = action.user;
            return state;
        case ActionTypes.LOGOUT:
            state.user = null;
            return state;
        default:
            return state
    }
};
