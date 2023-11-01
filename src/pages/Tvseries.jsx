import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Tvseries = () => {
  const id = JSON.parse(localStorage.getItem('myId'));
  const [tvSeries, setTvSeries] = useState([]);
  const Key = '26e2fa922cb6b8d9569ee0698f4e5226';
  const imgBaseUrl = 'https://image.tmdb.org/t/p';

  const url3 = `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${Key}`;

  useEffect(() => {
    axios
      .get(url3)
      .then((response) => {
        // Check the actual structure of the response and set tvSeries accordingly
        setTvSeries(response.data); // Assuming response.data is an array of TV series
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, Key, url3]);

  return (
    <div>
      
    </div>
  );
};

export default Tvseries;
