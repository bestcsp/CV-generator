import React, { useState, useEffect } from 'react';
import QualificationDropdown from './components/qualification'
const qualification = ["10", "12th", "Diploma", "Bachelor", "Post-graduate"];
const initialEducation = { "qualification": "", "year": "" };
const skillsProp = { "skill": "", "year of experience": "" };
const initialExperience = { "fromYear": "", "toYear": "", "companyName": "", "designation": "", "responsibilities": "" };
const sectionOpt={
  "skills":skillsProp,
  "experience":initialExperience,
  "education":initialEducation
}   



// InputField component
const InputField = ({ placeholder, value, onChange, readOnly }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    readOnly={readOnly}
  />
);

// Section component for rendering individual sections
const Section = ({ section, data, handleInputChange, handleAddSection,handleRemoveSection, isAdmin }) => (
  <div key={section}>
    <h3>{section}</h3>
    {Array.isArray(data) ? (
      <div>
        {data.map((item, index) => (
          <div key={index}>
            {Object.keys(item).map((key) => (
              // <div className="objKeys">
              key=='qualification'?(
                <QualificationDropdown
                  key={key}
                  value={item[key]}
                  onChange={(selectedValue) => handleInputChange(section, index, key, selectedValue)}
                  options={qualification} // Replace with your qualification options
                  readOnly={!isAdmin}
                />
              ) 
              :
              (<InputField
                key={key}
                placeholder={key}
                value={item[key]}
                onChange={(e) => handleInputChange(section, index, key, e.target.value)}
                readOnly={!isAdmin}
              />)
            ))}
            {["work experience","education","skills"].includes(section)&& isAdmin? (
              <button className="removeButton" onClick={() => handleRemoveSection(section, index)}>
                x
              </button>
            ) : null}
            
          </div>
        ))}
        { ["education","work experience","skills"].includes(section) && isAdmin && (    
            <button  className="addButton" onClick={() => handleAddSection(section, sectionOpt[section])}>
              +
            </button>
        )}
      </div>
    ) : (
      Object.keys(data).map((key) => (
        <InputField
          key={key}
          placeholder={key}
          value={data[key]}
          onChange={(e) => handleInputChange(section, key, e.target.value)}
          readOnly={!isAdmin}
        />
      ))
    )}
  </div>
);

function App() {
  const [resume, setResume] = useState({
    "personal details": { "email": "", "fullname": "", "mobile": "", "address": "" },
    "education": [initialEducation],
    "work experience": [initialExperience],
    "skills": [skillsProp]
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const handleRemoveSection = (section, index) => {
    setResume((prevResume) => ({
      ...prevResume,
      [section]: prevResume[section].filter((_, i) => i !== index),
    }));
  };

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

  const handleInputChange = (section, index, key, value) => {
    if (isAdmin) {
      setResume((prevResume) => {
        const updatedResume = { ...prevResume };  
        if (Array.isArray(updatedResume[section])) {
          updatedResume[section] = updatedResume[section].map((item, i) =>
            i === index ? { ...item, [key]: value } : item
          );
        } else {
          // It's a non-array section
          if (index !== null) {
            // This handles the case of nested objects within the non-array section
            updatedResume[section] = {
              ...updatedResume[section],
              [index]: key,
            };
          } else {
            // This handles the case of updating the top-level properties of the non-array section
            updatedResume[section] = {
              ...updatedResume[section],
              [key]: value,
            };
          }
        }
  
        return updatedResume;
      });
    }
  };
  
  
  

  const handleAddSection = (section, initialObject) => {
    setResume((prevResume) => ({
      ...prevResume,
      [section]: [...prevResume[section], { ...initialObject }]
    }));
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
          <Section
            key={section}
            section={section}
            data={resume[section]}
            handleInputChange={handleInputChange}
            handleAddSection={handleAddSection}
            handleRemoveSection={handleRemoveSection}
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </>
  );
}

export default App;
