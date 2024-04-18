import React, { useState } from 'react'
import axios from 'axios'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import loaderImg from '../assets/loaderImg.jpg'



const Movies = () => {

    let navigate = useNavigate()

    const [loader, setLoader] = useState(false)
    const [movies, setMovies] = useState([])
    const [select, setSelect] = useState('day')
    const [topRated, setTopRated] = useState([])
    const [discover, setDiscover] = useState([])
    const [search, setSearch] = useState("")
    const [message, setMessage] = useState("")
    const [searchMovies, setSearchMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [people, setPeople] = useState([])






    const Key = import.meta.env.VITE_APP_MY_KEY
    const imgBaseUrl = "https://image.tmdb.org/t/p";


    let endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${Key}`
    let endpoint2 = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${Key}`
    // let endpoint3 = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${Key}`
    // let endpoint4 = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${Key}`
    
            // PEOPLE
    let endpoint4 = `https://api.themoviedb.org/3/trending/person/week?language=en-US&api_key=${Key}`
    let endpoint7 = `https://api.themoviedb.org/3/trending/person/day?language=en-US&api_key=${Key}`

    // let endpoint = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${Key}`
    let endpoint3 = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${Key}`
     

    let endpoint5 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${Key}`
    let endpoint6 = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1&api_key=${Key}`



    if (select === 'week') {
        // navigate('/detail')
        axios.get(endpoint2)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(endpoint4)
            .then((response) => {
                // console.log(response.data.results);
                setPeople(response.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    else {
        axios.get(endpoint)
            .then((response) => {
                setLoading(false)
                // console.log(response.data.results);
                setMovies(response.data.results)
            })
            .catch((err) => {
                console.log(err);
            })


        axios.get(endpoint3)
        .then((response) => {
                setLoading1(false)
                // console.log(response.data.results);
                setTopRated(response.data.results)
            })
            .catch((err) => {
                console.log(err);
            })

            axios.get(endpoint7)
            .then((response) => {
                setLoading2(false)
                // console.log(response.data.results);
                setPeople(response.data.results)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    axios.get(endpoint5)
        .then((response) => {
            setLoading2(false)
            // console.log(response.data.results);
            setDiscover(response.data.results)
        })
        .catch((err) => {
            console.log(err);
        })




    const Get = () => {
        if (search === "") {
            setMessage("input cannot be empty")
        } else {
            setLoader(false)
            axios.get(endpoint6)
                .then((response) => {
                    if (response.data.results < 1 || "") {
                        setMessage("Series or Movies not found")
                        setLoader(false)
                        setSearch("")
                    } else {
                        // console.log(response.data.results);
                        setSearchMovies(response.data.results)
                        setLoader(false)
                        setSearch("")
                        setMessage("")
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // we have 2 diff api majorly one for the movie and the other for the tv so we write a statement to check . if it is tv it should pick the api of movie and set it
    const seriesId = (e, media) => {
        if (media == "tv") {
            localStorage.setItem('myId', JSON.stringify({ e, media }))
            navigate('/detail')
        }
        else {
            localStorage.setItem('myId', JSON.stringify(e))
            navigate('/detail')
        }
    }

    return (
        <section className='px-5 bg-black '>
            <div className='lg:w-1/3 md:w-1/2 w-full flex justify-between'>
                <div className='flex border border-orange-600 dark:dark:border-gray-900 mt-10 rounded-lg bg-white  w-full lg:ms-2 '>
                    <span><FiSearch className='text-black mt-2' /></span>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search Movies or TV Series' className='text-black rounded-lg outline-none p-1 w-full' value={search} />
                </div>
                <button onClick={Get} className='bg-orange-600 font-bold dark:bg-gray-900 lg:ms-5 text-white lg:me-0 ms-5 px-5 mt-10 rounded-lg'>{loader ?
                    <div className='text-center'>
                        <img src={loaderImg} alt="" width={20} />
                    </div> : 'Search'}
                </button>

            </div>
            <small className='text-red-600'>{message}</small>

            <div className='flex mt-10'>
                <h1 className='me-4'>Trending</h1>
                <select className='text-black cursor-pointer' name="" id="" onChange={(e) => setSelect(e.target.value)} value={select}>
                    <option value="day">day</option>
                    <option value="week">week</option>
                </select>
            </div>

            <h1>{search ? 'Results' : ''}</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 cursor-pointer gap-10 p-2'>
                {
                    searchMovies.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => seriesId(item.id, item.media_type)}>

                                <p><img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px]' alt="" /></p>
                                <p>{item.name}</p>
                                <div className='text-center'>{item.title}</div>

                            </div>
                        </div>
                    ))
                }
            </div>



            <h1 className='mt-5 text-xl'>Movies</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
                {
                    loading ?  <div className='lg:ms-[380%] ms-[130%] dark:text-white text-orange-600 font-bold'>Loading.....</div> :
                    movies.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => seriesId(item.id)}>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px]  hover:scale-110 rounded' alt="" />
                                <div className='text-center me-5 text-sm'>{item.title}</div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h1 className='mt-5 text-xl'>Top Rated</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
                {
                    loading1 ?  <div className='lg:ms-[380%] ms-[130%] dark:text-white text-orange-600 font-bold'>Loading.....</div> :
                    // series &&
                    topRated.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => seriesId(item.id, item.media_type)}>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px]  hover:scale-110 rounded' alt="" />
                                <div className='text-center me-5 text-sm'>{item.title}</div>
                            </div>
                        </div>
                    ))
                }
            </div>


            <h1 className='mt-5 text-xl'>Discover</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
                {
                    loading2 ?  <div className='lg:ms-[380%] ms-[130%] dark:text-white text-orange-600 font-bold'>Loading.....</div> :
                    discover &&
                    discover.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => seriesId(item.id, item.media_type)}>
                                <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px]  hover:scale-110 rounded' alt="" />
                                <div className='text-center me-5 text-sm'>{item.name}</div>
                                <div className='text-center text-sm'>{item.title}</div>
                            </div>
                        </div>

                    ))
                }
            </div>



            
            <h1 className='mt-5 text-xl'>People</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
                {
                    loading2 ?  <div className='lg:ms-[380%] ms-[130%] dark:text-white text-orange-600 font-bold'>Loading.....</div> :
                    people &&
                    people.map((item, i) => (
                        <div key={i}>
                            <div onClick={() => seriesId(item.id, item.media_type)}>
                                <img src={`${imgBaseUrl}/original/${item.profile_path}`} className='w-full h-[70px]  hover:scale-110 rounded' alt="" />
                                <div className='text-center me-5 text-sm'>{item.name}</div>
                                <div className='text-center text-sm'>{item.title}</div>
                            </div>
                        </div>

                    ))
                }
            </div>


            
        </section>
    )
}
export default Movies