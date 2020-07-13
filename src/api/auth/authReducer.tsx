import {LOGIN, LOGOUT} from './constants/action-types';

const initialState = {
    user: undefined,
};


export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                user: action.payload?.user
            };
        case LOGOUT:
            return {
                user: undefined
            };
        default:
            return state;
    }
};