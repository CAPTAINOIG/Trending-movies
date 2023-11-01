import React, { useState } from 'react'
import axios from 'axios'
import {FiSearch} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

// import loaderImg from '../assets/loaderImg.jpg   

// loader ? <img src={loaderImg} alt="" /> :'

const Movies = () => {
    
    let navigate = useNavigate()

    const [movies, setMovies] = useState([])
    // const [loader, setLoader] = useState(false)
    const [select, setSelect] = useState('day')
    const [series, setSeries] = useState([])
    const [discover, setDiscover] = useState([])
    const [search, setSearch] = useState("")
    const [searchMovies, setSearchMovies] = useState([])




    const Key = '26e2fa922cb6b8d9569ee0698f4e5226'
    const imgBaseUrl = "https://image.tmdb.org/t/p";


    let endpoint = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${Key}`
    let endpoint2 = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=${Key}`
    let endpoint3 = `https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=${Key}`
    let endpoint4 = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${Key}`
    let endpoint5 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${Key}`
    let endpoint6 = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1&api_key=${Key}`



    if (select === 'week') {
        axios.get(endpoint2)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            })
            
            axios.get(endpoint4)
            .then((response)=>{
                // console.log(response.data.results);
                setSeries(response.data.results)
            })
            .catch((err)=>{
                console.log(err);
            })
        }


    else {
        axios.get(endpoint)
            .then((response) => {
                // console.log(response.data.results);
                setMovies(response.data.results)
            })
            .catch((err) => {
                console.log(err);
            })


            axios.get(endpoint3)
            .then((response)=>{
                // console.log(response.data.results);
                setSeries(response.data.results)
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    axios.get(endpoint5)
    .then((response)=>{
        // console.log(response.data.results);
        setDiscover(response.data.results)
    })
    .catch((err)=>{
        console.log(err);
    })



    const Get=()=>{
        axios.get(endpoint6)
        .then((response)=>{
            // console.log(response.data.results);
            setSearchMovies(response.data.results)
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    const seriesId=(e, media)=>{
        localStorage.setItem('myId', JSON.stringify({e, media}))
        navigate('/detail')
    }

    return (
        <section className='px-5 bg-black '>
        <div className='lg:w-1/3 md:w-1/2 w-full flex justify-between'>
        <div className='flex border border-orange-600 dark:dark:border-gray-900 mt-10 bg-orange-600 rounded-lg bg-white lg:w-3/4 w-[60%] lg:ms-2 ms-3'>
        <span><FiSearch className='text-black mt-2'/></span>
        <input  type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Search Movies or TV Series'  className='text-black w-full border rounded-lg ms-5 outline-none p-1'/>
        </div>
        <button onClick={Get} className='bg-orange-600 font-bold dark:bg-gray-900 text-white lg:me-0 me-5 px-5 mt-10 rounded'>Search</button>
    </div>

                <div className='flex mt-10'>
                    <h1 className='me-4'>Trending</h1>
                    <select className='text-black' name="" id="" onChange={(e) => setSelect(e.target.value)} value={select}>
                        <option value="day">day</option>
                        <option value="week">week</option>
                    </select>
                </div>

                <h1>{search ? 'Results' : ''}</h1>
                <div className='grid lg:grid-cols-7 grid-cols-3 gap-10 p-2'>
                {
                    searchMovies.map((item, i)=>(
                        <div key={i}>
                        <Link to={`/detail/${item.id}`}>
                        <p><img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px]' alt="" /></p>   
                        <p>{item.name}</p>
                        <div className='text-center'>{item.title}</div>
                        </Link>
        
                        </div>
                        ))
                    }
                </div>

                

            <h1 className='mt-5 text-xl'>Movies</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
                {
                    movies.map((item, i) => (
                        <div key={i} className=''>
                        <Link to={`/detail/${item.id}`}>
                        <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] w-[130px] hover:scale-110 rounded' alt="" />
                        <div className='text-center me-5 text-sm'>{item.title}</div>
                        </Link>
                        </div>
                    ))
                }
            </div>

            <h1 className='mt-5 text-xl'>Series</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
            {
                series &&
                    series.map((item, i) => (
                        <div key={i} className=''>
                        <div onClick={() => seriesId(item.id, item.media_type)}>
                        <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] w-[130px] hover:scale-110 rounded' alt="" />
                        <div className='text-center me-5 text-sm'>{item.name}</div>                            
                        </div>
                        </div>
                    ))
                }
            </div>


            <h1 className='mt-5 text-xl'>Discover</h1>
            <div className='grid lg:grid-cols-7 grid-cols-3 p-5 gap-10'>
            {
                discover &&
                    discover.map((item, i) => (
                        <div key={i} className=''>
                            <img src={`${imgBaseUrl}/original/${item.poster_path}`} className='w-full h-[70px] w-[130px] hover:scale-110 rounded' alt="" />
                            <div className='text-center me-5 text-sm'>{item.name}</div> 
                        <div className='text-center text-sm'>{item.title}</div>                           
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default Movies