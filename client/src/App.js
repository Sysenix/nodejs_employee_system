import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Employees from './components/Employees';
import Header from './components/Header';

function App() {

  return (
    <>
     <Router>
      <>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Employees />}> </Route>
        </Routes>
      </>
      
    </Router>
    
    </>

  );
}

export default App;
