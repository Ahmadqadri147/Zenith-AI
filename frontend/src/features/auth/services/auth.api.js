// to communicate with the backend we need to insatll axios
import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function Register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password
        },)
        return response.data;

    } catch (error) {
        console.log(error);
    }

}

export async function Login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password
        },)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function Logout() {
    try {
        const response = await api.get("/api/auth/logout")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getME() {
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
