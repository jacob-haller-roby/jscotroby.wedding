import ActionTypes from './ActionTypes';

export function login(user) {
    return {
        action: ActionTypes.LOGIN,
        user
    }
}

export function logout() {
    return {
        action: ActionTypes.LOGOUT
    }
}