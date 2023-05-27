import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import ItemPage from './views/ItemPage/ItemPage';
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
import useAuthWithPermissions from './authentication/useAuthWithPermissions';

const theme = createTheme({
    palette: {
        primary: { main: green[500], contrastText: '#fff' },
        secondary: {
            main: '#a5d6a7',
        },
    },
});

function AdminRoutes() {
    // eslint-disable-next-line no-unused-vars
    const [isAuthenticated, credentials, authKey, hasPermissions, callLogin, callLogout] = useAuthWithPermissions([
        'adminpanel.access',
    ]);
    if (isAuthenticated && hasPermissions) {
        console.log(authKey);
        return (
            <Routes>
                <Route path="/admin/item/:id" element={<AdminEditItem authKey={authKey} />} />
                <Route path="/admin/item/new" element={<AdminNewItem authKey={authKey} />} />
                <Route path="/admin/order" element={<AdminOrderList authKey={authKey} />} />
                <Route path="/admin/order/:id" element={<AdminEditOrder authKey={authKey} />} />
                <Route path="/admin/item" element={<AdminItemList authKey={authKey} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path="/admin/*" element={<></>} />
        </Routes>
    );
}

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
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/item" element={<ProductsList />} />
                        <Route path="/order/status" element={<OrderStatus />} />
                    </Routes>
                    <AdminRoutes />
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
