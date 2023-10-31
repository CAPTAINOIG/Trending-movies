import React from 'react'
import tmdb from '../assets/TMDB.png'

const Footer = () => {
  return (
    <>
    <div className='dark:bg-gray-900 bg-orange-600'>
        <footer className='flex flex-col justify-center text-white items-center'>
            <p>Powered by</p>
            <img src={tmdb} width={50} alt="" />
            <p>Developed by CaptainOIG</p>
        </footer>
    </div>
    </>
  )
}

export default Footer