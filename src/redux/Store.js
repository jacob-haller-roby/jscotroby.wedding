import {createStore, applyMiddleware} from 'redux';
import IdentityReducer from "./IdentityReducer";
import InteractionsReducer from './InteractionsReducer';
import ReduxThunk from 'redux-thunk';

export default createStore((state = {}, action) => ({
        identity: IdentityReducer(state.identity, action),
        interactions: InteractionsReducer(state.interactions, action)
    }),
    applyMiddleware(ReduxThunk));