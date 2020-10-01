import React, { useState, useEffect } from 'react';
import Loading from '../../Loading';
import axios from 'axios';
import '../../../App.css';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';

function UpdateAnimeComplex() {
  const urlParams = new URLSearchParams(window.location.search);

  const [animeList, setAnimeList] = useState();
  const [animeComplex, setAnimeComplex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(urlParams.get('id'));
  const [selectedData, setSelectedData] = useState([]);

  const initialFormData = Object.freeze({
    "title": "",
    "anime": ""
  });

  const loadAnimeComplex = async () => {
    const { data } = await axios.get(`http://localhost:8080/anime-complex/?id=${id}`);
    setAnimeComplex(data);
    setSelectedData(data.anime);
  };

  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    console.log("Amount of selected: " + value.length);
    setSelectedData([...value]);
    updateFormData({
      ...formData,
      "anime": value,
    });
  };

  const [formData, updateFormData] = useState(initialFormData);

  const loadAnimeList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/anime/');
    setAnimeList(data);
    const someArray = [];
    data.map(item => someArray.push({
      value: item,
      label: item.title
    }));
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnimeComplex();
    loadAnimeList();
  }, [id, loadAnimeComplex]);

  const handleChange = (e) => {
    setAnimeComplex({
      ...animeComplex,
      [e.target.name]: e.target.value.trim(),
      anime: selectedData
    });
  };
  
  const handleSubmit = async (e) => {
    setAnimeComplex({
      ...animeComplex,
      anime: selectedData
    });
    e.preventDefault();
    await axios.post('http://localhost:8080/anime-complex/update', animeComplex, {
      headers: {
        'content-type': 'application/json'
      }
    });
    };

  if (isLoading) {
    return <Loading />;
  }

  return (
    animeComplex && animeList && selectedData &&
    <div className="createForm">
        <input name="title" type="text" className="createFormInput" placeholder="Title" onChange={handleChange} value={animeComplex.title}></input>
        <FormControl className="formControl">
        <InputLabel id="demo-mutiple-chip-label" className="inputChip">Anime</InputLabel>
          <Select
            className="animeSelect"
            id="demo-mutiple-chip"
            multiple
            autoWidth
            rows
            value={selectedData}
            onChange={handleChangeMultiple}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div className="chips">
                {selected.map((selectedItem) => (
                  <Chip key={selectedItem} label={selectedItem.title} />
                ))}
              </div>
            )}
          >
            {animeList.map((anime) => (
              <MenuItem key={anime._id} value={anime}>
                {anime.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button className="createFormButton" type="button" onClick={handleSubmit}>Update</button>
      </div>
  );
}

export default UpdateAnimeComplex;
