import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Alert from './components/layout/Alert';


function App() {
  return (
    <>
    <Alert/>
    <Router>
    
    <Navbar/>

      <Routes>
    <Route path='/' element={<Landing/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
      </Routes>

    
    </Router>
    </>
  );
}

export default App;
