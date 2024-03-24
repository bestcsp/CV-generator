import React, { useState, useEffect } from 'react';
import TempLateSection from './tempLateSection';

function Template (){
    const [resume, setResume] = useState({
        "Personal Details": { "fullname": "","email": "",  "mobile": "", "address": "" },
        "Education": [],
        "Work Experience": [],
        "Skills": []
      });

     // Effect to check for resume data in local storage on component mount
  useEffect(() => {
    const storedResume = localStorage.getItem('myResume');
    if (storedResume) {
      setResume(JSON.parse(storedResume));
    }
  }, []);
      
return(
    <>
    <div className="container">
  ( <TempLateSection 
      key={"resume"}
      data={resume}
      section={Object.keys(resume)}

    />)
    </div>
    </>
)}

export default Template;