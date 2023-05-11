import React, { useState } from 'react';
import { 
    createUserWithEmailAndPasswordFunction,
    createParticipantProfile,
    createHostProfile,
    getAllTags
 } from './firebase/firebaseFunction'

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const [hostProfile, setHostProfile] = useState({});

    const context = {
        createUserWithEmailAndPasswordFunction,
        createParticipantProfile,
        createHostProfile,
        getAllTags
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}