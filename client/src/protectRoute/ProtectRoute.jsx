import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import baseUrl from '../utils/url';
import { Navigate } from 'react-router-dom';
import './ProtectRoute.css'

const ProtectRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {

        const verifyUser = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/auth/verify-user`, { withCredentials: true });
                if (res.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.log(`Error Occured in protected Route: ${error.message}`);
                setIsAuthenticated(false);
            }
        }

        verifyUser()

    }, [])

    if (isAuthenticated === null) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Verifying your session...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;

    }
    return (
        <div className="fade-in">
            {children}
        </div>
    )
}

export default ProtectRoute