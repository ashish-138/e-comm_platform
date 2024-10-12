import { Getauth } from "./Auth"

export const setHeader = ()=>{
        const headers={
            headers:{
            "x-auth-token": Getauth()
        }
    }
    return headers;
}