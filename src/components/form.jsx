import React, { useState, useEffect } from 'react';
import QualificationDropdown from './qualification'
const qualification = ["10", "12th", "Diploma", "Bachelor", "Post-graduate"];
const initialEducation = { "qualification": "", "year": "" };
const skillsProp = { "skill": "", "year of experience": "" };
const initialExperience = { "fromYear": "", "toYear": "", "companyName": "", "designation": "", "responsibilities": "" };
const sectionOpt={
  "Skills":skillsProp,
  "Work Experience":initialExperience,
  "Education":initialEducation
}   

const Label = ({ text }) => (
  <label className="label">Enter your {text}:</label>
);

// InputField component
const InputField = ({ label, value, placeholder, onChange, readOnly, error }) => (
    <div className={`inputField ${error ? 'error' : ''}`} style={{ marginBottom: '10px' }}>
      <Label text={label} />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{ marginLeft: '8px' }}
      />
      {error && <span className="errorText">Invalid {label}</span>}
    </div>
  );


// Section component for rendering individual sections
const Section = ({ section, data, handleInputChange, handleAddSection, handleRemoveSection, isAdmin }) => {
    const [error, setError] = useState({}); // State to track errors
  
    const validateEmail = (value) => {
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      return isValidEmail;
    };
  
    const validateMobile = (value) => {
      const isValidMobile = /^\d{10}$/.test(value);
      return isValidMobile;
    };
  
    const handleValidation = (key, value) => {
      let updatedError = { ...error };
  
      if (section === "Personal Details" && key === "email") {
        updatedError = { ...updatedError, [key]: !validateEmail(value) };
      }
  
      if (section === "Personal Details" && key === "mobile") {
        updatedError = { ...updatedError, [key]: !validateMobile(value) };
      }
  
      setError(updatedError);
    };
  
    const resetValidation = () => {
      setError({});
    };
  
    const handleInput = (key, value, index = null) => {
        resetValidation();
        handleValidation(key, value);
        handleInputChange(section, index, key, value);
      };
  
    return (
      <div key={section}>
        <h3>{section}</h3>
        {Array.isArray(data) ? (
          <div>
            {data.map((item, index) => (
              <div className='block-input' key={index}>
                {Object.keys(item).map((key) => (
                  key === 'qualification' ? (
                    <QualificationDropdown
                      key={key}
                      value={item[key]}
                      onChange={(selectedValue) => handleInput(key, selectedValue, index)}
                      options={qualification} // Replace with your qualification options
                      readOnly={!isAdmin}
                    />
                  ) : (
                    <InputField
                      label={key}
                      key={key}
                      placeholder={key}
                      value={item[key]}
                      onChange={(e) => handleInput(key, e.target.value, index)}
                      readOnly={!isAdmin}
                      error={error[key]}
                    />
                  )
                ))}
                {["Work Experience", "Education", "Skills"].includes(section) && isAdmin ? (
                  <button className="removeButton" onClick={() => handleRemoveSection(section, index)}>
                    x
                  </button>
                ) : null}
              </div>
            ))}
            {["Education", "Work Experience", "Skills"].includes(section) && isAdmin && (
              <button className="addButton" onClick={() => handleAddSection(section, sectionOpt[section])}>
                + Add
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
              onChange={(e) => handleInput(key, e.target.value)}
              readOnly={!isAdmin}
              error={error[key]}
            />
          ))
        )}
      </div>
    );
  };
  

function Form({isAdmin}) {
  const [resume, setResume] = useState({
    "Personal Details": { "fullname": "","email": "",  "mobile": "", "address": "" },
    "Education": [initialEducation],
    "Work Experience": [initialExperience],
    "Skills": [skillsProp]
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
        if (Array.isArray(updatedResume[section])) {
            console.log({section,index,key,value})
          updatedResume[section] = updatedResume[section].map((item, i) =>
            i === index ? {...item, [key]: value } : item
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
