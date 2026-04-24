import { createContext, useState, useEffect } from "react";
import { getME } from "./services/auth.api.js"


export const AuthContext = createContext({
    user: null,
    setUser: () => { }
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getME();
                if (data && data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Session verification failed:", error);
            } finally {
                setloading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setloading }}>
            {children}
        </AuthContext.Provider>
    );
};