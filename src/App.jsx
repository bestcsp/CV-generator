// App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Form from './components/form';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <Router>
      <div>
        <div className='navBar' style={{ textAlign: 'right', padding: '10px' }}>
          <h3>This is my {isAdmin?"Admin":""} CV generator Page</h3>
          <button style={{backgroundColor: isAdmin ? '#e74c3c' : '#2ecc71'}} onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? 'Disable Admin' : 'Enable Admin'}
          </button>
        </div>
        <Routes>
          {isAdmin ? (
            <Route path="/isadmin" element={<Form isAdmin={true} />} />
          ) : (
            <Route path="/" element={<Form isAdmin={false} />} />
          )}
          <Route
            path="/*"
            element={<Navigate to={isAdmin ? '/isadmin' : '/'} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
