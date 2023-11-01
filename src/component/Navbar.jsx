import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineHome, AiOutlineFullscreen} from 'react-icons/ai'
import {MdOutlinePersonalVideo} from 'react-icons/md'
import {TfiVideoClapper}  from 'react-icons/tfi'
import {BsSun} from 'react-icons/bs'
import {BiSolidMoon} from 'react-icons/bi'
import oig from '../assets/oig.jpg'
import { AppContext } from '../context/Dashboard'
import { FullScreen } from 'react-full-screen'



const Navbar = () => {
    const { theme, setTheme, handle } = useContext(AppContext)
    // console.log(theme);
  return (
    <>
    <FullScreen handle={handle}>
    <div className='sticky w-full top-0 dark:bg-gray-900 bg-orange-600 z-[10000000]'>
        <nav className='flex justify-around py-1'>
        <Link className='mt-4 text-white' to="/">Home</Link>
        <div className='flex lg:gap-10 gap-5 mt-5'>
        <Link className='text-white' to="/"><AiOutlineHome/></Link>
        <Link className='text-white' to="/"><TfiVideoClapper/></Link>
        <Link className='text-white' to="/"><MdOutlinePersonalVideo/></Link>
        <div>
        {
            theme === 'dark' ? 
            <BsSun size={17} className='cursor-pointer text-white' onClick={()=> setTheme ("light")}/>:
            <BiSolidMoon size={17}  className='cursor-pointer text-white'  onClick={()=> setTheme("dark")}/>
        }
        </div>
        <div className='cursor-pointer rounded-lg text-white '>
        <AiOutlineFullscreen size={17} onClick={handle.enter} />
        </div>
        </div>
        <img src={oig} className='rounded-[100%] h-[43px] border border-white'  width={45} alt="" />
        </nav>
    </div>
    </FullScreen>
    </>
  )
}

export default Navbar