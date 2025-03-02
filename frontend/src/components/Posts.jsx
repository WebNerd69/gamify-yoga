import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import PostCard from './PostCard'

const Posts = () => {
     // const [postsData,setPostsData] = useState([])       
     const {posts} = useContext(AppContext)
  return (
    <div className='w-[80%] mx-auto px-20 py-10 max-h-[85vh] overflow-y-auto'>
          {posts.map((item,index)=>{
               return(
                    <div key={index}>
                        <PostCard image={item.image} name={item.name} description={item.description} rating={item.rating} userId={item.userId} _id={item._id} />
                    </div>
               )
          })}
    </div>
  )
}

export default Posts