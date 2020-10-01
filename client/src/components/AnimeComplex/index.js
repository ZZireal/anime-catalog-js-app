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

function AnimeComplex() {
  const [isLoading, setIsLoading] = useState(true);
  const [paramOrder, setparamOrder] = useState(false);
  const [animeComplexList, setAnimeComplexList] = useState([]);
  const [wasDeleted, setWasDeleted] = useState(false);

  const loadAnimeList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/anime-complex/');
    setAnimeComplexList(data);
    setIsLoading(false);
    setWasDeleted(false);
  };

  console.log(animeComplexList, typeof animeComplexList);

  useEffect(() => {
    loadAnimeList();
  }, [wasDeleted]);

  const handleClickField = async (field) => {
    setAnchorEl(null);
    setparamOrder(!paramOrder);
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/anime-complex/?field=${field}&order=${paramOrder}`);
    setAnimeComplexList(data);
    setIsLoading(false);
  };

  const deleteAnime = async (animeComplexId, animeId, animeComplexTitle, animeTitle) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить из "${animeComplexTitle}" аниме "${animeTitle}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/anime-complex/?animeComplexId=${animeComplexId}&animeId=${animeId}`, {
        headers: {
          'content-type': 'application/json'
        }
      });
     setWasDeleted(true);
    }
  };

  const deleteAnimeComplex = async (animeComplexId, animeComplexTitle) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить "${animeComplexTitle}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/anime-complex/?animeComplexId=${animeComplexId}`, {
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
          <MenuItem className="sortDropdownItem" onClick={() => handleClickField('genre')}>Amount</MenuItem>
        </Menu>
      </div>
      <div className="tableBody">
      {
        animeComplexList &&
        animeComplexList.map((child, i) => (
        <>
          <div className="tableTitle" key={i}>
            {child.title}
            <Link className="editDeleteIcon editDeleteIconComplex" to={`anime-complex/update?id=${child._id}`}>
              <EditIcon />
            </Link>
            <Link className="editDeleteIcon" onClick={() => deleteAnimeComplex(child._id, child.title)}>
              <DeleteIcon />
            </Link>
          </div>  
          
          {
            child.anime.map((childAgain, j) => (
              <>
                <div className="tableBodyRow" key ={j}>
                  <div className="tableBodyRowImage"><img className="animeImage" src={childAgain.image} /></div>
                  <div className="tableBodyRowTitle">{childAgain.title}</div>
                  <div className="tableBodyRowGenre">{childAgain.genre}</div>
                  <div className="tableBodyRowCategory">{childAgain.category}</div>
                  <div className="tableBodyRowSeries">{childAgain.series}</div>
                  <div className="tableBodyRowYear">{childAgain.year}</div>
                  <div className="editDeleteAge">
                    <div className="editDeleteIconWrapper">
                      <Link className="editDeleteIcon" onClick={() => deleteAnime(child._id, childAgain._id, child.title, childAgain.title)}>
                        <DeleteIcon />
                      </Link>
                    </div>
                    <div className="tableBodyRowAge">{childAgain.age}+</div>
                  </div>
                </div>
            </>
          ))
          }
          </>
        ))
      }
      </div>
      <div className="addIconWrapper">
        <Fab color="inherit" size="medium" aria-label="add" href="anime-complex/create">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default AnimeComplex;
