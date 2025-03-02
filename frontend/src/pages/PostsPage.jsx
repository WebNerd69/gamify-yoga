import React from 'react'
import Sidebar from '../components/Sidebar'
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'

const PostsPage = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='w-[100%] flex justify-between flex-col'>
        <Posts/>
        <AddPost/>
      </div>
    </div>
  )
}

export default PostsPage