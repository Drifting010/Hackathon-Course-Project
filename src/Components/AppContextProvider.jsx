import React, { useState } from 'react';
import {
    updateUserProfile, uploadIcon, createUserWithEmailAndPasswordFunction,
    createParticipantProfile,
    createHostProfile,
    getAllTags,
    getCurrentUser,
    getUser,
    signInWithEmailAndPasswordFunction
} from './firebase/firebaseFunction'
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import React from 'react';
import { addHackathon, createUserWithEmailAndPasswordFunction, getCurrentUser, getUser, signInWithEmailAndPasswordFunction, addDocumentToSubCollection } from './firebase/firebaseFunction'

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
        createParticipantProfile,
        createHostProfile,
        getAllTags,
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