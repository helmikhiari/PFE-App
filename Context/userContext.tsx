import { createContext } from "react";

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

export const userContext=createContext<Props>({
    Authenticated:false,
    token:null,
    profile:null
});


