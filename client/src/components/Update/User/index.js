import React, { useState, useEffect } from 'react';
import Loading from '../../Loading';
import axios from 'axios';
import '../../../App.css';

function UpdateUser() {
  const urlParams = new URLSearchParams(window.location.search);

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(urlParams.get('id'));

  const loadUser = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/user/?id=${id}`);
    setUser(data);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://localhost:8080/user/', user, {
      headers: {
        'content-type': 'application/json'
      }
    });
    };

  useEffect(() => {
    loadUser();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    user &&
    <div className="createForm">
        <input name="username" type="text" className="createFormInput" placeholder="Username" onChange={handleChange} value={user.username}></input>
        <input name="lastname" type="text" className="createFormInput" placeholder="Lastname" onChange={handleChange} value={user.lastname}></input>
        <input name="firstname" type="text" className="createFormInput" placeholder="Firstname" onChange={handleChange} value={user.firstname}></input>
        <input name="role" type="text" className="createFormInput" placeholder="Role" onChange={handleChange} value={user.role}></input>
        <button className="createFormButton" type="button" onClick={handleSubmit}>Update</button>
      </div>
  );
}

export default UpdateUser;
