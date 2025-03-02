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
  const [user,setUser] = useState()
  const BACKEND_URL = "https://gamify-yoga-backend.onrender.com"
  const navigate = useNavigate()


  //use effects
  useEffect(() => {
    if (localStorage.getItem('token')&&!token) {
      setToken(localStorage.getItem('token'))
    } else {
      navigate('/login')
    }

  }, [])

  const fetchUser = async()=>{
    try {
      const token = localStorage.getItem("token"); // Fetch token dynamically
      console.log("Token:", token);
      if (!token) {
        return toast.error("No token found")
      }
      const response = await axios.get(BACKEND_URL+'/api/users/get',{headers:{token}})
      console.log(response)
      if (response.data.success) {
        setUser(response.data.userData)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.mesage)
    }
  }
  const fetchPosts = async()=>{
    try {
      
      const postData = await axios.get(BACKEND_URL+"/api/posts/list") 
      if (postData.data.success) {
        setPosts(postData.data.data)
        // console.log(postData)
        
      } else {
        toast.error("failed to load posts")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect( () => {
    fetchPosts();
    fetchUser(token);
  }, [])
  
  const reloadPosts = ()=>{
    fetchPosts()
  }
  
  const value = {
    BACKEND_URL,
    token,
    setToken,
    navigate,
    posts,
    lettuce,addImage,
    user,
    reloadPosts
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;