import {createStore, applyMiddleware} from 'redux';
import IdentityReducer from "./IdentityReducer";
import ReduxThunk from 'redux-thunk';

export default createStore((state = {}, action) => ({
        identity: IdentityReducer(state.identity, action)
    }),
    applyMiddleware(ReduxThunk));