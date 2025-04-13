import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/auth';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/" />;
    }
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

function App() {
    return (
        <AuthProvider>
            <div className="bg-background-primary text-text-primary min-h-screen transition-colors duration-300 ease-in-out">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/tasks"
                        element={
                            <PrivateRoute>
                                <Tasks />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
