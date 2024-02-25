import React, { createContext, useEffect, useState } from 'react'
import {FullScreen, useFullScreenHandle} from 'react-full-screen'


export const AppContext = createContext()

const DashboardContext =({children})=>{
    const handle = useFullScreenHandle()
    const [theme, setTheme] = useState('light')





    // this will run first, when the code load it will first check the local storage and see what is inside the storage
    // storedTheme to check if there is theme apply else go on and run the second code of setting the theme
    
    const getThemeFromLocalStorage = () => {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme ? JSON.parse(storedTheme) : 'light';
  };

  // here it will set the whatever theme inside local storage
  const setThemeToLocalStorage = (newTheme) => {
      localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  // here we will update it
  const updateTheme = (newTheme) => {
      setTheme(newTheme);
      setThemeToLocalStorage(newTheme);
  };

  useEffect(() => {
      const storedTheme = getThemeFromLocalStorage();
      updateTheme(storedTheme);
  }, []);




    useEffect(() => {
      if(theme === 'dark'){
        document.documentElement.classList.add("dark")
      } else{
        document.documentElement.classList.remove("dark")
      }
    }, [theme])

    return (
        <AppContext.Provider value={{theme, setTheme, setTheme: updateTheme, handle}}>
             {children}
        </AppContext.Provider>
    )
    
}
export default DashboardContext