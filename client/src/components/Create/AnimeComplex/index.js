import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import Loading from '../../Loading';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function CreateAnime() {
  const [animeList, setAnimeList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectData, setSelectData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const handleChangeMultiple = (event) => {
    const { value } = event.target;
    setSelectedData([...value]);
    updateFormData({
      ...formData,
      "anime": value,
    });
  };

  const loadAnimeList = async () => {
    setIsLoading(true);
    const { data } = await axios.get('http://localhost:8080/anime/');
    setAnimeList(data);
    const someArray = [];
    data.map(item => someArray.push({
      value: item,
      label: item.title
    }));
    setSelectData(someArray);
    console.log(someArray);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnimeList();
  }, []);

  const initialFormData = Object.freeze({
    "title": ""
    });

  const [formData, updateFormData] = useState(initialFormData);
  
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
      anime: selectedData,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post('http://localhost:8080/anime-complex/', formData, {
      headers: {
        'content-type': 'application/json'
      }
    });
    };

    if (isLoading) { 
      return <Loading />;
    }

  return (
    animeList &&
    <div className="createForm">
      <input name="title" type="text" className="createFormInput" placeholder="Title" onChange={handleChange}></input>
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
      <button className="createFormButton" type="button" onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default CreateAnime;
