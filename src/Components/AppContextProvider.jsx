import React from 'react';
import { createUserWithEmailAndPasswordFunction } from './firebase/firebaseFunction'

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