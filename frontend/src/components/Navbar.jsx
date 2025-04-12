import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav>
			<div className="nav-left">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/tasks">Tasks</NavLink>
			</div>
		</nav>
	);
};
