import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
    return (
        <div className="bg-background-primary text-text-primary min-h-screen transition-colors duration-300 ease-in-out">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </div>
    );
}

export default App;
