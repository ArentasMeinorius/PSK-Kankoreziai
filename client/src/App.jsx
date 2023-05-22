import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import ItemPage from './views/ItemPage/ItemPage';
import AdminLanding from './views/admin/AdminLanding';
import CartPage from './views/cart/CartPage';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                    <Route path="/admin" element={<AdminLanding />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
