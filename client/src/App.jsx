import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import AdminLanding from './views/admin/AdminLanding';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/admin" element={<AdminLanding />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
