import ActionTypes from './ActionTypes';

export function login(user) {
    return {
        type: ActionTypes.LOGIN,
        user
    }
}

export function logout() {
    return {
        type: ActionTypes.LOGOUT
    }
}