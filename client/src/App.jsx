import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import ItemPage from './views/ItemPage/ItemPage';
import AdminLanding from './views/admin/AdminLanding';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar.jsx';
import { Box } from '@mui/material';


const theme = createTheme({
    palette: {
        primary: { main: green[500], contrastText: '#fff' },
        secondary: {
            main: '#a5d6a7',
        },
    },
});

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
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
