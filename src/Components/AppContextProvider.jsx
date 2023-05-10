import React, { useState } from 'react';
import { createUserWithEmailAndPasswordFunction } from './firebase/firebaseFunction'

export const AppContext = React.createContext();

export default function AppContextProvider({ children }) {
    const [hostProfile, setHostProfile] = useState({});

    const context = {
        hostProfile,
        setHostProfile,
        createUserWithEmailAndPasswordFunction
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}