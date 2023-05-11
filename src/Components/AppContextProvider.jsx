import React from 'react';
import { createUserWithEmailAndPasswordFunction, getCurrentUser, getUser, signInWithEmailAndPasswordFunction } from './firebase/firebaseFunction'

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const context = {
        createUserWithEmailAndPasswordFunction,
        getCurrentUser,
        getUser,
        signInWithEmailAndPasswordFunction,
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}