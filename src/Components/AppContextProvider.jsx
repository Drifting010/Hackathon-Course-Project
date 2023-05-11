import React from 'react';
import { 
    createUserWithEmailAndPasswordFunction,
    createParticipantProfile,
    createHostProfile,
    getAllTags,
    getCurrentUser, 
    getUser, 
    signInWithEmailAndPasswordFunction
 } from './firebase/firebaseFunction'

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const context = {
        createUserWithEmailAndPasswordFunction
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}