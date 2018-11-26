import { createStore } from 'redux';
import IdentityReducer from "./IdentityReducer";

export default createStore((state = {}, action) => ({
    identity: IdentityReducer(state.identity, action)
}));