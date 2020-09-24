import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { Button } from '@material-ui/core';
import axios from 'axios';

import Fab from '@material-ui/core/Fab';
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

  const handleClick = async (field) => {
    setparamOrder(!paramOrder);
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/anime/?field=${field}&order=${paramOrder}`);
    setAnimeList(data);
    setIsLoading(false);
  };

  const deleteAnime = async (id, title) => {
    const isDeleted = window.confirm(`Вы уверены, что хотите удалить из каталога аниме "${title}"?`);
    if (isDeleted) {
      await axios.post(`http://localhost:8080/anime/delete?id=${id}`, {
        headers: {
          'content-type': 'application/json'
        }
      });
     setWasDeleted(true);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
    <table className="animeTable">
      <thead>
			  <tr>
          <th scope="col"><Button color='inherit' size='large' fullWidth disabled></Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('title')}>Title</Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('genre')}>Genre</Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('category')}>Category</Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('series')}>Series</Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('year')}>Year</Button></th>
          <th scope="col"><Button color='inherit' size='large' fullWidth onClick={() => handleClick('age')}>Age</Button></th>
        </tr>
			</thead>
      <tbody>
        {
        animeList &&
        animeList.map((child, i) => (
          <>
            <tr key ={i}>
					    <td><img className="animeImage" src={child.image} /></td>
              <td>{child.title}</td>
					    <td>{child.genre}</td>
					    <td>{child.category}</td>
					    <td>{child.series}</td>
					    <td>{child.year}</td>
					    <td className="editDeleteAge">
                <div className="editDeleteIconWrapper">
                  <Link className="blueColor" to={`update?id=${child._id}`}>
                    <EditIcon />
                  </Link>
                  <Link className="blackColor" onClick={() => deleteAnime(child._id, child.title)}>
                    <DeleteIcon />
                  </Link>
                </div>
                <div>{child.age}</div>
              </td>
					  </tr>
            </>
          ))
        }
      </tbody>
		</table>
    <div className="addIconWrapper">
      <Fab color="inherit" size="medium" aria-label="add" href="create">
        <AddIcon />
      </Fab>
    </div>
    </>
  );
}

export default Catalog;
