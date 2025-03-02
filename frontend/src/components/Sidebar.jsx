import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Sidebar = () => {
  const { BACKEND_URL, token, setToken , navigate} = useContext(AppContext)
  return (
    <div className='min-w-[320px] max-w-[320px] h-screen flex px-5 py-4 flex-col items-start gap-6 shadow-lg'>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/')}>Home</p>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/myposts')}>My posts</p>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/leaderboard')}>Leader Board</p>

    </div>
  )
}

export default Sidebar