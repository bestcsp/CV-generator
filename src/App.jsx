import React, { useState, useEffect } from 'react';

const qualification = ["10", "12th", "Diploma", "Bachelor", "Post-graduate"];
const education ={"qualification":"","year":""};
const experience= {"fromYear": "", "toYear": "" , "companyName": "", "designation": "","responsibilies":""} ; 

function App() {
  const [resume, setResume] = useState({
    "personal details": { "email": "", "fullname": "", "mobile": "", "address": "" },
    "education": [education],
    "work experience": [experience],
    "skills": []
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    // Save resume to local storage
    localStorage.setItem('myResume', JSON.stringify(resume));
  };

  // Effect to check for resume data in local storage on component mount
  useEffect(() => {
    const storedResume = localStorage.getItem('myResume');
    if (storedResume) {
      setResume(JSON.parse(storedResume));
    }
  }, []);

  const handleInputChange = (section, key, value) => {
    if (isAdmin) {
      setResume((prevResume) => {
        const updatedResume = { ...prevResume };

        if (Array.isArray(updatedResume[section])) {
          updatedResume[section] = value;
        } else {
          updatedResume[section] = {
            ...updatedResume[section],
            [key]: value
          };
        }

        return updatedResume;
      });
    }
  };

  return (
    <>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? 'Disable Admin' : 'Enable Admin'}
        </button>
      </div>
      <h3> This is my CV generator</h3>
      <div className="container">
        {Object.keys(resume).map((section) => (
          <div key={section}>
            <h3>{section}</h3>
            {Array.isArray(resume[section]) ? (
              <input
                key={section}
                placeholder={section}
                value={resume[section]}
                onChange={(e) => handleInputChange(section, null, e.target.value)}
                readOnly={!isAdmin}
              />
            ) : (
              Object.keys(resume[section]).map((key) => (
                <input
                  key={key}
                  placeholder={key}
                  value={resume[section][key]}
                  onChange={(e) => handleInputChange(section, key, e.target.value)}
                  readOnly={!isAdmin}
                />
              ))
            )}
          </div>
        ))}
        {isAdmin && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </>
  );
}

export default App;
