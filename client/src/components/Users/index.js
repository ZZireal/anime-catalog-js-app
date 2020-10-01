import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { Button } from '@material-ui/core';
import axios from 'axios';

import { Fab, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../App.css';

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [paramOrder, setparamOrder] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [wasDeleted, setWasDeleted] = useState(false);

  const loadUsersList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/user/');
    setUsersList(data);
    setIsLoading(false);
    setWasDeleted(false);
  };

  useEffect(() => {
    loadUsersList();
  }, [wasDeleted]);


  useEffect(() => {
    loadUsersList();
  }, []);

  const handleClickField = async (field) => {
    setAnchorEl(null);
    setparamOrder(!paramOrder);
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/user/?field=${field}&order=${paramOrder}`);
    setUsersList(data);
    setIsLoading(false);
  };

  const deleteUser = async (id, username) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить пользователя "${username}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/user/?id=${id}`, {
        headers: {
          'content-type': 'application/json'
        }
      });
     setWasDeleted(true);
    }
  };

  //for dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  if (isLoading) { 
    return <Loading />;
  }

  return (
    <div className="table">
      <div className="tableHead">
        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Сортировать
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          className="sortDropdown"
          keepMounted={false}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('firstname')}>Firstname</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('lastname')}>Lastname</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('username')}>Username</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('role')}>Role</MenuItem>
        </Menu>
      </div>
      <div className="tableBody">
      {
        usersList &&
        usersList.map((child, i) => (
        <>
          <div className="tableBodyRow" key ={i}>
            <div>
              <div className="tableBodyRowUsername"><span className="blueColor">Username:</span> {child.username}</div>
              <div className="tableBodyRowName"><span className="blueColor">Name:</span> {child.firstname} {child.lastname}</div>
              <div className="tableBodyRowRole"><span className="blueColor">Role:</span> {child.role}</div>
            </div>
            <div className="editDeleteAge">
              <div className="editDeleteIconWrapper">
                <Link className="editDeleteIcon" to={`user/update?id=${child._id}`}>
                  <EditIcon />
                </Link>
                <Link className="editDeleteIcon" onClick={() => deleteUser(child._id, child.username)}>
                  <DeleteIcon />
                </Link>
              </div>
            </div>
          </div>
          </>
        ))
      }
      </div>
      <div className="addIconWrapper">
        <Fab color="inherit" size="medium" aria-label="add" href="user/create">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Users;
