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

function Catalog() {
  const [isLoading, setIsLoading] = useState(true);
  const [paramOrder, setparamOrder] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [wasDeleted, setWasDeleted] = useState(false);

  const loadAnimeList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/anime/');
    setAnimeList(data);
    setIsLoading(false);
    setWasDeleted(false);
  };

  useEffect(() => {
    loadAnimeList();
  }, [wasDeleted]);

  const handleClickField = async (field) => {
    setAnchorEl(null);
    setparamOrder(!paramOrder);
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/anime/?field=${field}&order=${paramOrder}`);
    setAnimeList(data);
    setIsLoading(false);
  };

  const deleteAnime = async (id, title) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить из каталога аниме "${title}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/anime/?id=${id}`, {
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

  if (isLoading) return <Loading />;

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
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('genre')}>Genre</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('category')}>Category</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('series')}>Series</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('year')}>Year</MenuItem>
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('age')}>Age</MenuItem>
        </Menu>
      </div>
      <div className="tableBody">
      {
        animeList &&
        animeList.map((child, i) => (
        <>
          <div className="tableBodyRow" key ={i}>
            <div className="tableBodyRowImage"><img className="animeImage" src={child.image} /></div>
            <div className="tableBodyRowTitle">{child.title}</div>
            <div className="tableBodyRowGenre">{child.genre}</div>
            <div className="tableBodyRowCategory">{child.category}</div>
            <div className="tableBodyRowSeries">{child.series}</div>
            <div className="tableBodyRowYear">{child.year}</div>
            <div className="editDeleteAge">
              <div className="editDeleteIconWrapper">
                <Link className="editDeleteIcon" to={`update?id=${child._id}`}>
                  <EditIcon />
                </Link>
                <Link className="editDeleteIcon" onClick={() => deleteAnime(child._id, child.title)}>
                  <DeleteIcon />
                </Link>
              </div>
              <div className="tableBodyRowAge">{child.age}+</div>
            </div>
          </div>
          </>
        ))
      }
      </div>
      <div className="addIconWrapper">
        <Fab color="inherit" size="medium" aria-label="add" href="create">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Catalog;
