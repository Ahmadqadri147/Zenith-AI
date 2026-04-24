import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    if (loading) {
        return <>
            <h1 className='font-bold text-4xl justify-center items-center text-blue-300'>Loading...</h1>
        </>
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default Protected