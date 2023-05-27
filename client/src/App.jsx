import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './views/Landing';
import ItemPage from './views/ItemPage/ItemPage';
import AdminLanding from './views/admin/AdminLanding';
import CartPage from './views/cart/CartPage';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar.jsx';
import { Box } from '@mui/material';
import OrderStatus from './views/OrderStatus';
import ProductsList from './views/ProductsList';
import AdminItemList from './views/admin/AdminItemList';
import AdminEditItem from './views/admin/AdminEditItem';
import AdminNewItem from './views/admin/AdminNewItem';
import AdminOrderList from './views/admin/AdminOrderList';
import AdminEditOrder from './views/admin/AdminEditOrder';
import PropTypes from 'prop-types';

const theme = createTheme({
    palette: {
        primary: { main: green[500], contrastText: '#fff' },
        secondary: {
            main: '#a5d6a7',
        },
    },
});

function RequireAdminAuth({ children }) {
    const hasPermission = async (permission, token) => {
        const response = await fetch(`http://localhost:5000/user/haspermission?permission=${permission}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const hasAccess = await response.json();
        if (!hasAccess) {
            return false;
        }
        return true;
    };
    const token = localStorage.getItem('authKey');
    const adminPermissions = hasPermission(['items.see', 'items.manage', 'products.create'], token);
    return token && adminPermissions ? children : <Navigate to="/admin" replace />;
}

RequireAdminAuth.propTypes = {
    children: PropTypes.object,
};

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Navbar />
                    <Box mt={10} />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/item/:id" element={<ItemPage />} />
                        <Route path="/admin" element={<AdminLanding />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/item" element={<ProductsList />} />
                        <Route path="/order/status" element={<OrderStatus />} />
                        <Route
                            path="/admin/item/:id"
                            element={
                                <RequireAdminAuth>
                                    <AdminEditItem />
                                </RequireAdminAuth>
                            }
                        />
                        <Route
                            path="/admin/item/new"
                            element={
                                <RequireAdminAuth>
                                    <AdminNewItem />
                                </RequireAdminAuth>
                            }
                        />
                        <Route
                            path="/admin/order"
                            element={
                                <RequireAdminAuth>
                                    <AdminOrderList />
                                </RequireAdminAuth>
                            }
                        />
                        <Route
                            path="/admin/order/:id"
                            element={
                                <RequireAdminAuth>
                                    <AdminEditOrder />
                                </RequireAdminAuth>
                            }
                        />
                        <Route
                            path="/admin/item"
                            element={
                                <RequireAdminAuth>
                                    <AdminItemList />
                                </RequireAdminAuth>
                            }
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
