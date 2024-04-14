import { createContext, useContext, useState } from "react";

type profile=
{
    firstName:string;
    lastName:string;
    picture:string;
}

interface Props
{
    Authenticated:Boolean;
    token:string|null;
    profile:profile|null;
}

export const UserContext=createContext<Props>({
    Authenticated:false,
    token:null,
    profile:null
});

export const useUserContext=()=>
    {
        return useContext(UserContext);
    }

export const UserContextProvider=({children}:{children:any})=>
    {   const [Authenticated,setAuthenticated]=useState<boolean>(false);
        const [token,setToken]=useState<string|null>(null);
        const [profile,setProfile]=useState<profile|null>(null);
        const value={
            Authenticated,setAuthenticated,
            token,setToken,
            profile,setProfile
        }
        return (
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        )
    }


