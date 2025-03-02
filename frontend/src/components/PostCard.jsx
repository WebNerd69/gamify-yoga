import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const PostCard = ({image,name,description,rating,userId,_id}) => {
  const [userName,setUserName] = useState([])
  const {BACKEND_URL,lettuce, navigate} = useContext(AppContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${BACKEND_URL}/api/users/get/for-post`,{ userId })
        if (res.data.success) {
          setUserName(res.data.userData.name)
        } else {
          console.log(res.data.message)
        }
      } catch (error) {
        console.error("Error fetching user name:", error)
      }
    }

    fetchData()
  }, [])
  
  return (
    <div className='w-[720px] rounded-xl shadow-md p-7 my-12 cursor-pointer' onClick={()=>navigate(`/comment/${_id}`)} >
      <div className='flex items-center'>
        <img src={lettuce} alt="" className='rounded-full aspect-square w-10 h-10'/>
        <p className='font-medium mx-4'> {userName}</p>
      </div>
      <img src={image} alt="" className='w-full object-cover rounded-lg'/>
      <div className=''>
        <p className='font-medium text-xl my-3'>Name: {name}</p>
        <div>
        <p className='text-sm'>Description : </p>
        <p className='text-sm text-gray-500'>{description}</p>
        </div>
        <div className='flex items-center gap-2 my-2'>
        <p className=''>Rating : <span className='font-medium'>{rating}</span></p>
        <span className='text-[12px] text-gray-400 w-3/4'>Remember rating is given using AI , it might be a bit missleading</span>
        </div>
        <p className='text-end text-gray-700 cursor-pointer hover:text-gray-950' onClick={()=>navigate(`/comment/${_id}`)}>Add Comment  <i className="ri-message-3-line"></i></p>
      </div>
    </div>
  )
}

export default PostCard