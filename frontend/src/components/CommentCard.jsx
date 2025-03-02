import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const CommentCard = ({ message, userId }) => {
  const [userName, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { BACKEND_URL, lettuce } = useContext(AppContext);

  
  const fetchUser = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/get/for-post`,{ userId })
      console.log(res)
      if (res.data.success) {
        setName(res.data.userData.name)
      } else {
        console.log(res.data.message)
      }
    } catch (error) {
      console.error("Error fetching user name:", error)
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);
  return (
    <div className='w-60 h-auto min-h-24 rounded-xl shadow-sm my-5 p-4'>
      {loading ? (
        <p className="text-gray-500">Loading user data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="flex items-center mb-2">
            <img 
              src={lettuce || "https://via.placeholder.com/40"} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <h3 className="font-medium">{userName || "Anonymous User"}</h3>
          </div>
          <p className="text-gray-700">{message}</p>
        </>
      )}
    </div>
  );
};

export default CommentCard;
