import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';

const MyPosts = () => {
     const { BACKEND_URL, token } = useContext(AppContext);
     const [mylist, setMyList] = useState(Array);

     const fetchPosts = async () => {
          try {
               const response = await axios.get(BACKEND_URL + '/api/posts/my-list', { headers: { token } });
               console.log(response.data)
               setMyList(response.data.post); // ✅ Ensure `data` is always an array
          } catch (error) {
               if (axios.isCancel(error)) {
                    console.log('Axios request canceled:', error.message);
               } else {
                    console.error(error);
                    toast.error('Failed to fetch your posts');
               }
          }
     };
     const deletePost=async(id)=>{
          const response = await axios.post(BACKEND_URL+'/api/posts/delete',{id},{headers:{token}});
          if (response.data.success) {
          toast.success('Post successfully deleted');
          }else{
               toast.error(response.data.message)
          }
     }
     useEffect(() => {
          fetchPosts();
     }, [token, BACKEND_URL]);

     return (
          <div className='flex w-full'>
               <Sidebar />
               <div className="grid grid-cols-2 justify-center w-[80%] items-center py-4 overflow-y-auto h-[100vh]">

               {mylist.map((item, index) => (
                    <div key={index} className="flex justify-between items-center flex-col">
                         <PostCard
                              image={item.image}
                              name={item.name}
                              description={item.description}
                              rating={item.rating}
                              userId={item.userId}
                              _id={item._id}
                         />
                         <button onClick={() => deletePost(item._id)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                              Delete
                         </button>
                    </div>
               ))}
               </div>
          </div>
     );
};

export default MyPosts;
