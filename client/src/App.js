import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className="container">
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
