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
        <nav className="bg-background-secondary shadow-shadow-card flex items-center justify-between px-8 py-4">
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
                        <span className="text-text-secondary text-sm">
                            Bienvenido {user?.name}
                        </span>
                        <button
                            className="border-primary text-primary hover:bg-primary-hover hover:text-primary-hover cursor-pointer rounded-md border-2 bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
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
