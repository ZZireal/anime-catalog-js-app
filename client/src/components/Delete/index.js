import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

function Delete(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(props.animeList);
    setIsLoading(props.isLoading);
  }, [props.animeList, props.isLoading]);

  if (isLoading) return <Loading />;

  return <h2>Delete</h2>;
}

export default Delete;
