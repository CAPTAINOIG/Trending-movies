import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
// import { useParams } from 'react-router-dom'
import Similarmovie from './Similarmovie'
// import Tvseries from './Tvseries'


const Moviedetail = () => {
  // const { id } = useParams()
  const id1 = JSON.parse(localStorage.getItem('myId'));

  // const [tvSeries, setTvSeries] = useState([]);
  const [movieDetail, setMovieDetail] = useState("")
  const [language, setLanguage] = useState("")
  const [genre, setGenre] = useState("")
  const [casts, setCasts] = useState("")





  const Key = import.meta.env.VITE_APP_MY_KEY
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  let url = `https://api.themoviedb.org/3/movie/${id1}?language=en-US',&api_key=${Key}`
  const url1 = `https://api.themoviedb.org/3/movie/${id1}/credits?language=en-US&api_key=${Key}`;
  const url3 = `https://api.themoviedb.org/3/tv/${id1.e}?language=en-US&api_key=${Key}`;
  const url4 = `https://api.themoviedb.org/3/tv/${id1.e}/credits?language=en-US&api_key=${Key}`;

  




  axios.get(id1.media ? (url3) : (url))
    .then((response) => {
      // console.log(response.data);
      setMovieDetail(response.data)
      setLanguage(movieDetail.spoken_languages)
      setGenre(movieDetail.genres)
    })
    .catch((err) => {
      console.log(err);
    })

  useEffect(() => {
    axios.get(id1.media ? (url4) : (url1))
      .then((response) => {
        // console.log(response.data.cast);
        setCasts(response.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id1, Key, url1, url4]);



  // useEffect(() => {
  //   axios
  //     .get(url3)
  //     .then((response) => {
  //       // Check the actual structure of the response and set tvSeries accordingly
  //       setTvSeries(response.data); // Assuming response.data is an array of TV series
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [id, Key, url3]);





  return (
    <section>
      <div className='lg:flex gap-5 bg-black text-sm text-white border border-orange-600 dark:border-gray-900'>
        <div className='border lg:w-[55%]'>
          <img src={`${imgBaseUrl}/original/${movieDetail.poster_path}`} className='lg:h-full img-fluid p-5' alt="" />
        </div>
        <div className='border p-5 lg:pr-20 font-bold w-full'>
          <div className='my-12'>
            <p>Title: {movieDetail.original_title}</p>
            <p>{movieDetail.tagline}</p>
          </div>
          <p>Description:</p>
          <p>{movieDetail.overview}</p>
          <p>Release Date: {movieDetail.release_date}</p>
          <p>Status: {movieDetail.status}</p>
          <p className='font-bold'>Duration: {movieDetail.runtime}minutes</p>
          <p>Budget: ${movieDetail.budget}</p>


          <div className='flex gap-2'>
            <h1 className='font-bold'>Language</h1>
            {
              language &&
              language.map((item, i) => (
                <div key={i}>
                  <p className='bg-orange-600 px-2 rounded dark:bg-gray-900'>{item.name}</p>
                </div>
              ))
            }
          </div>

          <div className='flex mt-2 gap-2'>
            <h1 className='font-bold'>Genre</h1>
            {
              genre &&
              genre.map((item, i) => (
                <div key={i}>
                  <p className='bg-orange-600 gap-5 px-2 rounded dark:bg-gray-900'>{item.name}</p>
                </div>
              ))
            }
          </div>
          <div className='mt-10'>
            <h1>Casts</h1>
            <div className='grid lg:grid-cols-4 grid-cols-3 gap-2'>
              {casts &&
                casts.map((items, i) => (
                  <div key={i}>
                    <p className='flex rounded text-sm gap-2'><span className='mt-1'><AiOutlineStar /></span><span>{items.name}</span></p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Similarmovie />
        
      </div>
    </section>
  )
}

export default Moviedetail