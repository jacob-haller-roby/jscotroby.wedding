let actionTypes = {
    LOGIN: null,
    LOGOUT: null,
    LIST_FORMS: null,
    LIST_SUBMISSIONS: null,
    SUBMISSIONS_RECEIVED: null,
    FETCHING_SUBMISSIONS: null
};

for (let key in actionTypes) {
    actionTypes[key] = key;
}

export default actionTypes;