


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';
import UserForm from './components/UserForm';
import AudioFilesTable from './components/AudioFilesTable';
import ImageFilesTable from './components/ImageFilesTable';
import './App.css';
import AdminLoginForm from './components/AdminLoginForm';
import AudioAddpres from './components/AudioAddpres';
import ImageAddpres from './components/ImageAddpres'
import ImageMain from './components/ImageMain';


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
          <Route path="/audio-adminpage" element={<AudioFilesTable />}/>
          <Route path="/image-adminpage" element={<ImageFilesTable />}/>
          <Route path="/audio-addpres" element={<AudioAddpres />}/>
          <Route path="/image-addpres" element={<ImageAddpres />}/>
          <Route path="/image" element={<ImageMain />}/>

        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
