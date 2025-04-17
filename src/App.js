import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;