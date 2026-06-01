import { useContext , useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { Register, Login, Logout } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setloading } = context;

    const handlelogin = async ({ email, password }) => {
        try {
            const data = await Login({ email, password });
            setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        try {
            const response = await Register({ username, email, password });
            setUser(response.user);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const handleLogout = async () => {
        try {
            await Logout();
            setUser(null);
        } catch (error) {
            throw error;
        }
    }




    return { user, setUser, loading, setloading, handlelogin, handleRegister, handleLogout };

}
