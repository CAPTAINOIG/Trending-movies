import React, { createContext, useEffect, useState } from 'react'
import {FullScreen, useFullScreenHandle} from 'react-full-screen'


export const AppContext = createContext()

const DashboardContext =({children})=>{
    const handle = useFullScreenHandle()
    const [theme, setTheme] = useState('light')


    useEffect(() => {
      if(theme === 'dark'){
        document.documentElement.classList.add("dark")
      } else{
        document.documentElement.classList.remove("dark")
      }
    }, [theme])

    return (
        <AppContext.Provider value={{theme, setTheme, handle}}>
             {children}
        </AppContext.Provider>
    )
    
}
export default DashboardContext