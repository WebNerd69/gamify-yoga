import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
const Leaderboard = () => {
  const {BACKEND_URL, lettuce} = useContext(AppContext)
  const [leaderboardMembers,setLeaderboardMembers] = useState([])
  let len = leaderboardMembers.length
  const fetchLeaderboard = async()=>{
    try {
      const response = await axios.get(BACKEND_URL+'/api/leaderboard/get')
      if (response.data.success) {
        setLeaderboardMembers(response.data.leaderboard)
        // console.log(response.data.leaderboard[0])
      } else {
        toast.error("Failed to load data")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchLeaderboard();
  }, [])
  
  return (
    <div className='flex'>
      <Sidebar />
      <div className="px-20 py-10 w-2/3 flex flex-col" >
        <div className="grid grid-cols-3 gap-10 text-center w-[80%] mx-auto">
          
          {/* Second Place */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md max-h-[30vh] mt-10">
            <p className="text-lg font-bold">#2</p>
            <img src={leaderboardMembers[1]?.profilePic || lettuce} className="rounded-full w-32 h-32 my-2" alt="User 2" />
            <p className="text-xl font-semibold">{leaderboardMembers[1]?.name || "Loading..."}</p>
            <p className="text-gray-600">Avg Rating: {leaderboardMembers[1]?.avgRating ?? "N/A"}</p>
          </div>
          {/* First Place */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md max-h-[30vh]">
            <p className="text-lg font-bold">#1</p>
            <img src={leaderboardMembers[0]?.profilePic || lettuce} className="rounded-full w-32 h-32 my-2" alt="User 1" />
            <p className="text-xl font-semibold">{leaderboardMembers[0]?.name || "Loading..."}</p>
            <p className="text-gray-600">Avg Rating: {leaderboardMembers[0]?.avgRating ?? "N/A"}</p>
          </div>
  
  
          {/* Third Place */}
          <div className="flex flex-col items-center bg-gray-100 p-4 rounded-xl shadow-md max-h-[30vh] mt-14">
            <p className="text-lg font-bold">#3</p>
            <img src={leaderboardMembers[2]?.profilePic || lettuce} className="rounded-full w-32 h-32 my-2" alt="User 3" />
            <p className="text-xl font-semibold">{leaderboardMembers[2]?.name || "Loading..."}</p>
            <p className="text-gray-600">Avg Rating: {leaderboardMembers[2]?.avgRating ?? "N/A"}</p>
          </div>
  
        </div>

        {len>3&&<div className="flex w-3/4 my-10">
            {
              
              leaderboardMembers.slice(3,len).map((item,index)=>{
                return(
                  <div className=' px-5 py-2 border w-3/4 rounded-xl flex gap-4 justify-between items-center' key={index}>
                    <div className="flex items-center gap-2">
                        <p className='font-medium'>{`#${item.rank}` }</p>
                      <img src={leaderboardMembers[index]?.profilePic || lettuce} className="rounded-full w-14 h-14 my-2" alt="User 3" />

                    </div>
                      <div className="flex w-3/4 justify-between">
                        <p className='font-medium text-lg'>{`${item.name}` }</p>
                        <p className='text-gray-600'>{`Avg rating : ${item.avgRating}` }</p>
                      </div>
                      
                  </div>
                )
              })
            }
        </div>}
      </div>
    </div>
  );
  
  
  
}

export default Leaderboard