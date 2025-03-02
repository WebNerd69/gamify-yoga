import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Sidebar = () => {
  const { navigate, user , lettuce , setToken} = useContext(AppContext)
  const logoutHandler = ()=>{
    setToken("")
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div className='min-w-[320px] max-w-[320px] h-screen flex px-5 py-4 flex-col items-center justify-between shadow-lg'>
      <div className='flex flex-col items-start w-full gap-6'>

      <div className="w-full">
        <p className='font-medium text-lg'>Welcome back</p>
        {user && <p className='font-bold text-2xl'>{user.name.split(' ')[0]}</p>}
      </div>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/')}>Home</p>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/myposts')}>My posts</p>
      <p className='pl-3 py-3 border w-full font-medium cursor-pointer' onClick={()=>navigate('/leaderboard')}>Leader Board</p>
      </div>


      <button onClick={()=>logoutHandler()} className='absolute bottom-10 px-5 py-3 bg-red-700 text-white rounded-full hover:bg-red-500'>Logout</button>
    </div>
  )
}

export default Sidebar