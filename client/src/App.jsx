import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './views/Landing';
import AdminLanding from './views/admin/AdminLanding';
import rootReducer from './reducers/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

function App() {
    const store = createStore(rootReducer);

    return (
        <>
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/admin" element={<AdminLanding />} />
                    </Routes>
                </Router>
            </Provider>
        </>
    );
}

export default App;
