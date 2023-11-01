import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Similarmovie = () => {
  const id1 = JSON.parse(localStorage.getItem('myId'));
console.log(id1);
  const { id } = useParams()


  const [similarMovie, setSimilarMovie] = useState([]) // Initialize similarMovie as an empty array

  const Key = '26e2fa922cb6b8d9569ee0698f4e5226'
  const imgBaseUrl = "https://image.tmdb.org/t/p";


  let url2 = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=${Key}`
  let url3 = `https://api.themoviedb.org/3/tv/${id1}/similar?language=en-US&page=1&api_key=${Key}`


  useEffect(() => {
    axios.get(id1.media ? (url3) : (url2))
      .then((response) => {
        // console.log(response.data.results);
        setSimilarMovie(response.data.results)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id, Key, url2]) // Add id, Key, and url2 to the dependency array to make the API call when they change

  return (
    <div className='bg-black text-white'>
    <h1 className='font-bold p-5 text-2xl'>Similar</h1>
    <div className='grid lg:grid-cols-7 text-sm grid-cols-3 p-5 gap-10'>
        {
          similarMovie.map((item, i) => ( // Use parentheses instead of curly braces to return the JSX element
            <div key={i}>
            <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] w-[130px] hover:scale-110 rounded' alt="" />
            <div className='text-center me-5 text-sm'>{item.title}</div>   
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Similarmovie
