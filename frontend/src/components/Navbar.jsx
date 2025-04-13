import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinkStyles = ({ isActive }) =>
        `text-primary transition-all duration-200 ease-in-out px-3 py-2 rounded-md ${isActive ? 'font-bold' : 'font-normal'} hover:bg-primary hover:text-background-secondary`;
    return (
        <nav className="bg-background-secondary shadow-shadow-card flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
                <NavLink className={navLinkStyles} to="/">
                    Home
                </NavLink>
                <NavLink className={navLinkStyles} to="/tasks">
                    Tasks
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
