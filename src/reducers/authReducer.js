import { types } from "../types/types";

const initialState = {
    checking: true,
    //uid :null ,
    //name: null
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.authlogin:
            return {
                ...state,
                checking: false,
                ...action.payload,
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authlogout:
            return {                
                checking: false
            }

        default:
            return state;
    }
}
