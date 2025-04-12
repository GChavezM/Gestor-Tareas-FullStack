import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/tasks" element={<Tasks />} />
			</Routes>
		</div>
	);
}

export default App;
