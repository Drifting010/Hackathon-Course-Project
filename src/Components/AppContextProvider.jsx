import React, { useState } from 'react';
import { updateUserProfile, uploadIcon, createUserWithEmailAndPasswordFunction, getCurrentUser, getUser, signInWithEmailAndPasswordFunction } from './firebase/firebaseFunction'
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebaseConfig';

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const [currentUser,setCurrentUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
    });

    const context = {
        createUserWithEmailAndPasswordFunction,
        getCurrentUser,
        getUser,
        signInWithEmailAndPasswordFunction,
        currentUser
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}