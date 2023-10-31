"use client";

import React, {createContext, useState, useContext} from "react"

const AppContext = createContext({});

export const AppProvider = ({children}: any) => {
    const [authToken, setAuthToken] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    const signOut = () => {
        setAuthToken(null);
    }

    const isSignedIn = () => {
        if(authToken) return true;
        else return false;
    }

    return <AppContext.Provider 
    value={{
        authToken, 
        setAuthToken,
        userInfo, 
        setUserInfo,
        isSignedIn,
        signOut
    }}
    >{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)