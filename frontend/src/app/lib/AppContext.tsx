"use client";

import React, {createContext, useState, useContext} from "react"

const AppContext = createContext({});

export const AppProvider = ({children}: any) => {
    const [state, setState] = useState<any>({
        name: "",
        loggedIn: false,
        id: ""
    })

    return <AppContext.Provider value={{state, setState}}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)