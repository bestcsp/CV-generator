// QualificationDropdown.js

import React from 'react';

const QualificationDropdown = ({ value, onChange, options, readOnly }) => (
  <div className='qualificationBlock'>
    <label htmlFor="qualification">Qualification:</label>
    <select
      id="qualification"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={readOnly}
    >
      <option value="" disabled>Select Qualification</option>
      {options.map((qual) => (
        <option key={qual} value={qual}>
          {qual}
        </option>
      ))}
    </select>
  </div>
);

export default QualificationDropdown;
