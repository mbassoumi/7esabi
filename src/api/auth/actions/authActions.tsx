import {LOGIN} from '../constants/action-types';

export const loginAction = (user: any) => {
    return {
        type: LOGIN,
        payload: {
            user: user
        }
    }
};