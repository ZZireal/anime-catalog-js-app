import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import axios from 'axios';
import '../../App.css';

function Update() {
  const urlParams = new URLSearchParams(window.location.search);

  const [anime, setAnime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(urlParams.get('id'));

  const loadAnime = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8080/anime/?id=${id}`);
    setAnime(data);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    console.log(anime);
    setAnime({
      ...anime,
      [e.target.name]: e.target.value.trim(),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data: ', JSON.stringify(anime));
    console.log('Before post');
    const data = await axios.post('http://localhost:8080/anime/', anime, {
      headers: {
        'content-type': 'application/json'
      }
    });
    console.log('Data from post:', data);
    };

  useEffect(() => {
    loadAnime();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    anime &&
    <div className="createForm">
        <img src={anime.image} className="animeImage" readOnly ></img>
        <input name="title" type="text" className="createFormInput" placeholder="Title" onChange={handleChange} value={anime.title}></input>
        <input name="genre" type="text" className="createFormInput" placeholder="Genre" onChange={handleChange} value={anime.genre}></input>
        <input name="category" type="text" className="createFormInput" placeholder="Category" onChange={handleChange} value={anime.category}></input>
        <input name="series" type="number" className="createFormInput" placeholder="Series" onChange={handleChange} value={anime.series}></input>
        <input name="year" type="number" className="createFormInput" placeholder="Year" onChange={handleChange} value={anime.year}></input>
        <input name="age" type="number" className="createFormInput" placeholder="Age" onChange={handleChange} value={anime.age}></input>
        <button className="createFormButton" type="button" onClick={handleSubmit}>Update</button>
      </div>
  );
}

export default Update;
