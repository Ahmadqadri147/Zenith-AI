import { createBrowserRouter } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protected from './features/auth/components/protected'
import Home from './features/interview/pages/home'
import Interview from './features/interview/pages/interview'
import LandingPage from './pages/LandingPage'

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/home',
        element: (
            <Protected>
                <Home />
            </Protected>
        )
    },
    {
        path: '/interview/:id',
        element: (
            <Protected>
                <Interview />
            </Protected>
        )
    }
])
