import React, { createContext, useState, useEffect } from 'react'
import { useContext } from 'react'
import { toast } from "react-toastify"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export const AppContext = createContext()
import lettuce from "../assets/lettuce.png"
import addImage from "../assets/image-add-fill.svg"

const AppContextProvider = (props) => {
  // State variables
  const [posts,setPosts] = useState([])
  const [token, setToken] = useState('')

  const BACKEND_URL = "http://localhost:3000"
  const navigate = useNavigate()

  //use effects
  useEffect(() => {
    if (localStorage.getItem('token')&&!token) {
      setToken(localStorage.getItem('token'))
    } else {
      navigate('/login')
    }

  }, [])

  useEffect(async () => {
    const postData = await axios.get(BACKEND_URL+"/api/posts/list") 
    if (postData.data.success) {
      setPosts(postData.data.data)
      
    } else {
      toast.error("failed to load posts")
    }
  
  }, [])
  console.log(posts)
   

  const value = {
    BACKEND_URL,
    token,
    setToken,
    navigate,
    posts,
    lettuce,addImage
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;