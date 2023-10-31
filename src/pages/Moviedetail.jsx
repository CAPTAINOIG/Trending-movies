import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'


const Moviedetail = () => {
  const { id } = useParams()
  const [movieDetail, setMovieDetail] = useState("")
  const [language, setLanguage] = useState("")
  const [genre, setGenre] = useState("")




  const Key = '26e2fa922cb6b8d9569ee0698f4e5226'
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  let url = `https://api.themoviedb.org/3/movie/${id}?language=en-US',&api_key=${Key}`
  let url1 = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${Key}`


  axios.get(url)
    .then((response) => {
      console.log(response.data);
      setMovieDetail(response.data)
      setLanguage(movieDetail.spoken_languages)
      setGenre(movieDetail.genres)
    })
    .catch((err) => {
      console.log(err);
    })

  axios.get(url1)
    .then((response) => {
      // console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  return (


    <div className='lg:flex gap-5 border border-orange-600 dark:border-gray-900'>
      <div className='border lg:w-[55%]'>
        <img src={`${imgBaseUrl}/original/${movieDetail.poster_path}`} className='lg:h-full img-fluid' alt="" />
      </div>
      <div className='border lg:pr-20 w-full'>
        <div>

        <p>Title: {movieDetail.original_title}</p>
          <p>{movieDetail.tagline}</p>
        </div>
        <p>Description</p>
        <p>{movieDetail.overview}</p>
        <p>Release Date: {movieDetail.release_date}</p>
        <p>Status: {movieDetail.status}</p>
        <p>Duration: {movieDetail.runtime}minutes</p>
        <p>Budget: ${movieDetail.budget}</p>

      </div>



      {
        language &&
        language.map((item,i)=>(
          <div key={i}>
            <p>Language: {item.name}</p>
          </div>
        ))
      }


      
      {
        genre &&
        genre.map((item,i)=>(
          <div key={i}>
            <p>Genre: {item.name}</p>
          </div>
        ))
      }

    </div>
  )
}

export default Moviedetail