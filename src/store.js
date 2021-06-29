import {createContext, useState, useReducer} from 'react';

const authContext = createContext();

const authReducer = (payload, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.state,
                isAuth: true,
                token: payload
            }
            break;
        case 'LOGOUT':
            return {
                ...action.state,
                isAuth: false,
                token: null
            }
            break;
    
        default:
            break;
    }
}

const tokenStorage = localStorage.getItem('token');
const initialState = {
    isAuth: false,
    token: null
}

const AuthProvider = ({children}) => {
    const [store, dispatch] = useReducer(authReducer, initialState);


    return (
        <authContext.Provider value={{...store, dispatch}}>
            {children}
        </authContext.Provider>
    )
}

export {AuthProvider};
export default authContext;