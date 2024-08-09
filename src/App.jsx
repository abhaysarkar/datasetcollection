


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import UserForm from './components/UserForm';
import AudioFilesTable from './components/AudioFilesTable';
import './App.css';
import AdminLoginForm from './components/AdminLoginForm';
import Addpres from './components/Addpres'

const App = () => {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <h1>Medical Fields and Sub-Departments</h1> */}
        </header>
        <Routes>
          <Route 
            path="/" 
            element={isVerified ? <MainPage /> : <Login onVerify={() => setIsVerified(true)} />} 
          />
          <Route 
            path="/user-form" 
            element={<UserForm />} 
          />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/adminloginpage" element={<AdminLoginForm />} />
          <Route path="/adminpage" element={<AudioFilesTable />}/>
          <Route path="/addpres" element={<Addpres />}/>

        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
