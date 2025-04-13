import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Navbar = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const navLinkStyles = ({ isActive }) =>
        `text-primary transition-all duration-200 ease-in-out px-3 py-2 rounded-md ${isActive ? 'font-bold' : 'font-normal'} hover:bg-primary hover:text-background-secondary`;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between bg-background-secondary px-8 py-4 shadow-shadow-card">
            <div className="flex items-center gap-4">
                {token ? (
                    <NavLink className={navLinkStyles} to="/tasks">
                        Tasks
                    </NavLink>
                ) : (
                    <NavLink className={navLinkStyles} to="/">
                        Home
                    </NavLink>
                )}
            </div>
            <div className="flex items-center gap-4">
                {token && (
                    <>
                        <span className="text-sm text-text-secondary">
                            Bienvenido {user?.name}
                        </span>
                        <button
                            className="cursor-pointer rounded-md border-2 border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-all duration-200 ease-in-out hover:bg-primary-hover hover:text-background-secondary"
                            onClick={handleLogout}>
                            Cerrar Sesion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
