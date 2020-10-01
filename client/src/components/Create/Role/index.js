import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';

function CreateRole() {

  const initialFormData = Object.freeze({
    "title": "",
    "description": ""
  });

  const [formData, updateFormData] = useState(initialFormData);
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://localhost:8080/role/', formData, {
      headers: {
        'content-type': 'application/json'
      }
    });
  };

  return (
  <div className="createForm">
    <input name="title" type="text" className="createFormInput" placeholder="Title" onChange={handleChange}></input>
    <input name="description" type="text" className="createFormInput" placeholder="Description" onChange={handleChange}></input>
    <button className="createFormButton" type="button" onClick={handleSubmit}>Add</button>
  </div>
  );
}

export default CreateRole;
