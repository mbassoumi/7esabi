import {combineReducers} from 'redux';
import {authReducer} from '../../api/auth/authReducer';

export const rootReducer = combineReducers({
    auth: authReducer
});
