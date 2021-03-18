
import './App.css';
import MainScreen from './MainScreen';
import React,{useState,useEffect} from 'react'
import UserContext from './context/UserContext'
import DarkModeContext from './context/DarkModeContext'
import PostAdContext from './context/PostAdContext'
import { BrowserRouter } from 'react-router-dom'
import Axios from 'axios'
import baseUrl from './config/api'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
function App() {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  })

  const [darkMode, setDarkMode] = useState(false)
  const [postAd, setPostad] = useState({
    ['qty']: '',
    ['name']: '',
    ['tel']: '',
    ['tel2']: '',
    ['price']: '',
    ['promoted']: false,
    ['count']: 0,
    ['publisher']: '',
    ['description']: '',
    ['location']: '',
    ['category']: '',
    ['unit']: '',
    ['image']: '',
    ['lat']: 7.291418,
    ['lng']: 80.636696,
    ['address']: 'Please Select Your Location',
    ['province']: '',
  })
  useEffect(() => {
    try {
      let mode = localStorage.getItem('mode')
      if (mode === null) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }

      const checkLoggedIn = async () => {
        let token = localStorage.getItem('auth-token')
        if (token === null) {
          localStorage.setItem('auth-token', '')
          token = ''
        }
        try {
          const tokenRes = await Axios.post(
            baseUrl + 'users/tokenIsValid',
            null,
            {
              headers: {
                'x-auth-token': token,
              },
            },
          )

          if (tokenRes.data) {
            const userRes = await Axios.post(
              baseUrl + 'users/user',
              null,
              {
                headers: {
                  'x-auth-token': token,
                },
              },
            )
            //console.log(userRes)
            setUserData({
              token,
              user: userRes.data,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }

      checkLoggedIn()
    }
    catch (err) {
      console.log(err)
    }
  }, [])
  const theme = createMuiTheme({
    palette: {

      primary: {
        main: '#088A08',
      },
      secondary: {
        main: '#ffffff',
      },
      textSecondary:{
        main:'#ffffff'
      }

    },

   
  })
  ////////////////////////////


  return (
    <div className="app">
         <ThemeProvider theme={theme}>
     <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
              <PostAdContext.Provider value={{ postAd, setPostad }}>
                <div>
                  <MainScreen />
                </div>
              </PostAdContext.Provider>
            </DarkModeContext.Provider>
          </UserContext.Provider>
        </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default App;
