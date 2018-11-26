export function isLoggedIn(state) {
    return !!state.identity.user;
}

export function selectCurrentUser(state) {
    console.log(state);
    return state.identity.user;
}