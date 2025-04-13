import React from 'react';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data = response.data;
            setToken(data.token);
            localStorage.setItem('token', data.token);

            const userResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                },
            );
            const userData = await userResponse.data;
            setUser(userData.user);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setToken(null);
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/register`,
                { name, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            return true;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
