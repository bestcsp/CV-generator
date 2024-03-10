import React, { useState, useEffect } from 'react';
import QualificationDropdown from './qualification'
const qualification = ["10", "12th", "Diploma", "Bachelor", "Post-graduate"];
const initialEducation = { "qualification": "", "year": "" };
const skillsProp = { "skill": "", "year of experience": "" };
const initialExperience = { "fromYear": "", "toYear": "", "companyName": "", "designation": "", "responsibilities": "" };
const sectionOpt={
  "skills":skillsProp,
  "work experience":initialExperience,
  "education":initialEducation
}   

const Label = ({ text }) => (
  <label className="label">Enter your {text}:</label>
);

// InputField component
const InputField = ({ label, value,placeholder, onChange, readOnly }) => (
  <div className='inputField' style={{ marginBottom: '10px' }}>
    <Label text={label} />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{ marginLeft: '8px' }}
    />
  </div>
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
                label={key}
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
        label={key}
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

function Form({isAdmin}) {
  const [resume, setResume] = useState({
    "personal details": { "email": "", "fullname": "", "mobile": "", "address": "" },
    "education": [initialEducation],
    "work experience": [initialExperience],
    "skills": [skillsProp]
  });
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
        // Add validation for email and mobile
        if (section === "personal details" && key === "email") {
          const isValidEmail = /\S+@\S+\.\S+/.test(value);
          if (!isValidEmail) {
            // Handle invalid email (you can display an error message)
            return updatedResume;
          }
        }
  
        if (section === "personal details" && key === "mobile") {
          const isValidMobile = /^\d{10}$/.test(value);
          if (!isValidMobile) {
            // Handle invalid mobile number (you can display an error message)
            return updatedResume;
          }
        }
  
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
export default Form;
