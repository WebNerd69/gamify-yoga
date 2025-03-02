import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from "react-router-dom";
import PostsPage from './pages/PostsPage';
import Leaderboard from './pages/leaderboard';
import CommentPage from './pages/CommentPage';
import MyPosts from './pages/myPosts';
import Login from './pages/login';
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