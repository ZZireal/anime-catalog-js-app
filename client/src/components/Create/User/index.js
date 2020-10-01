import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';

function CreateUser() {

  const initialFormData = Object.freeze({
    "username": "",
    "lastname": "",
    "firstname": "",
    "role": "",
    "password": ""
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
    const data = await axios.post('http://localhost:8080/user/', formData, {
      headers: {
        'content-type': 'application/json'
      }
    });
    };

  return (
  <div className="createForm">
    <input name="username" type="text" className="createFormInput" placeholder="Username" onChange={handleChange}></input>
    <input name="firstname" type="text" className="createFormInput" placeholder="Firstname" onChange={handleChange}></input>
    <input name="lastname" type="text" className="createFormInput" placeholder="Lastname" onChange={handleChange}></input>
    <input name="role" type="text" className="createFormInput" placeholder="Role" onChange={handleChange}></input>
    <input name="passwordHash" type="text" className="createFormInput" placeholder="Password" onChange={handleChange}></input>
    <button className="createFormButton" type="button" onClick={handleSubmit}>Add</button>
  </div>
  );
}

export default CreateUser;
