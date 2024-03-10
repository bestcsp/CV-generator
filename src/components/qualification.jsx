import React from 'react';

const QualificationDropdown = ({ value, onChange, options, readOnly }) => (
  <div style={{ display: 'inline-block', position: 'relative' }}>
    <label htmlFor="qualification" style={{ marginRight: '8px' }}>Qualification:</label>
    <select
      id="qualification"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={readOnly}
      style={{ cursor: 'pointer' }}
    >
      <option value="" disabled>Select Qualification</option>
      {options.map((qual) => (
        <option key={qual} value={qual}>
          {qual}
        </option>
      ))}
    </select>
    {/* {value !== undefined && value !== null && value !== '' && !readOnly && (
      <button onClick={onRemove}>Remove</button>
    )} */}
  </div>
);

export default QualificationDropdown;

