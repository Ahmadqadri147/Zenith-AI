import { useContext , useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { Register, Login, Logout } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setloading } = context;

    const handlelogin = async ({ email, password }) => {
        setloading(true);

        try {
            const data = await Login({ email, password });
            setUser(data.user);
        } catch (error) { }
        finally {
            setloading(false);
        }

    }

    const handleRegister = async ({ username, email, password }) => {
        setloading(true);
        try {
            const response = await Register({ username, email, password });
            setUser(response.user);
        } catch (error) { }
        finally {
            setloading(false);
        }
    }

    const handleLogout = async () => {
        setloading(true);
        try {
        await Logout();
            setUser(null);
        } catch (error) { }
        finally {
            setloading(false);
        }
    }




    return { user, setUser, loading, setloading, handlelogin, handleRegister, handleLogout };

}
