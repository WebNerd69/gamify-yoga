import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from "react-router-dom";
import PostsPage from './pages/PostsPage';
import CommentPage from './pages/CommentPage';
import Login from './pages/login';
import Leaderboard from './pages/Leaderboard';
import MyPosts from './pages/MyPosts';
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<PostsPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/myposts' element={<MyPosts/>}/>
        <Route path='/comment/:_id' element={<CommentPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App