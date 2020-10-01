import React, { useState, useEffect } from 'react';
import Loading from '../../Loading';
import axios from 'axios';
import '../../../App.css';

function UpdateRole() {
  const urlParams = new URLSearchParams(window.location.search);

  const [role, setRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(urlParams.get('id'));

  const loadRole = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/role/?id=${id}`);
    setRole(data);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setRole({
      ...role,
      [e.target.name]: e.target.value.trim(),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://localhost:8080/role/', role, {
      headers: {
        'content-type': 'application/json'
      }
    });
    };

  useEffect(() => {
    loadRole();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    role &&
    <div className="createForm">
        <input name="title" type="text" className="createFormInput" placeholder="Username" onChange={handleChange} value={role.title}></input>
        <input name="description" type="text" className="createFormInput" placeholder="Lastname" onChange={handleChange} value={role.description}></input>
        <button className="createFormButton" type="button" onClick={handleSubmit}>Update</button>
      </div>
  );
}

export default UpdateRole;
