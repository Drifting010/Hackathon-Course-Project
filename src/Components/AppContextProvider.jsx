import React from 'react';
import { addHackathon, createUserWithEmailAndPasswordFunction, getCurrentUser, getUser, signInWithEmailAndPasswordFunction, addDocumentToSubCollection } from './firebase/firebaseFunction'

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const context = {
        createUserWithEmailAndPasswordFunction,
        getCurrentUser,
        getUser,
        signInWithEmailAndPasswordFunction,
        addDocumentToSubCollection,
        addHackathon
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}