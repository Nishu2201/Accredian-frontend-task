// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import { Button } from '@mui/material';

const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '220px' }}>
    <h1 style={{ fontWeight: 'bold', color:'yellow', fontSize:'70px' }}>Welcome to Homepage</h1>
    <Button variant="contained" color="secondary" component={Link} to="/signup" style={{ margin: '10px' }}>
      Sign Up
    </Button>
    <Button variant="contained" color="primary" component={Link} to="/login" style={{ margin: '10px' }}>
      Login
    </Button>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
