import { useState } from "react";
import { createContext, ReactNode } from "react";

type AuthContext = {
    session: null | UserAPIResponse
    save: (data: UserAPIResponse) => void
};

const LOCAL_STORAGE_KEY = "@refund";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<UserAPIResponse | null>(null);
    function save(data:UserAPIResponse){
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, JSON.stringify(data.token))
        setSession(data)
    }
    return (
        <AuthContext.Provider value={{session, save}}>
            {children}
        </AuthContext.Provider>
    )
}