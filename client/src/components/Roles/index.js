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

function Roles() {
  const [isLoading, setIsLoading] = useState(true);
  const [paramOrder, setparamOrder] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [wasDeleted, setWasDeleted] = useState(false);

  const loadRolesList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/role/');
    setRolesList(data);
    setIsLoading(false);
    setWasDeleted(false);
  };

  useEffect(() => {
    loadRolesList();
  }, [wasDeleted]);


  useEffect(() => {
    loadRolesList();
  }, []);

  const handleClickField = async (field) => {
    setAnchorEl(null);
    setparamOrder(!paramOrder);
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/role/?field=${field}&order=${paramOrder}`);
    setRolesList(data);
    setIsLoading(false);
  };

  const deleteTitle = async (id, username) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить пользователя "${username}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/role/?id=${id}`, {
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
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('title')}>Title</MenuItem>
        </Menu>
      </div>
      <div className="tableBody">
      {
        rolesList &&
        rolesList.map((child, i) => (
        <>
          <div className="tableBodyRow" key ={i}>
            <div>
              <div className="tableBodyRowUsername"><span className="blueColor">Title:</span> {child.title}</div>
              <div className="tableBodyRowName"><span className="blueColor">Description:</span> {child.description}</div>
            </div>
            <div className="editDeleteAge">
              <div className="editDeleteIconWrapper">
                <Link className="editDeleteIcon" to={`role/update?id=${child._id}`}>
                  <EditIcon />
                </Link>
                <Link className="editDeleteIcon" onClick={() => deleteTitle(child._id, child.title)}>
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
        <Fab color="inherit" size="medium" aria-label="add" href="role/create">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Roles;
