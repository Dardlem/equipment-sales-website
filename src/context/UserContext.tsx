import { createContext, ReactNode, useContext, useState } from "react";
import { auth } from "../helpers/firebase";

type UserProviderProps = {
    children: ReactNode
}

type UserContext = {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

const UserContext = createContext({} as UserContext)

export function useUser(){
    return useContext(UserContext);
}

export function UserProvider({ children }:UserProviderProps){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = () => {
        setIsLoggedIn(true);
    }

    const logOut = () => {
        setIsLoggedIn(false);
        auth.signOut();
    }

    return(
        <UserContext.Provider value={{isLoggedIn, logIn, logOut}}>
            {children}
        </UserContext.Provider>
    )
}