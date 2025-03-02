import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Sidebar from './../components/Sidebar';
import CommentCard from './../components/CommentCard';
import AddCommentForm from '../components/AddCommentForm';


const CommentPage = () => {
  const { _id } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [comments, setComments] = useState([]);
  const { posts } = useContext(AppContext);
  
  useEffect(() => {
    const filteredPosts = posts.filter((item) => item._id === _id);
    setFilteredData(filteredPosts);
  }, [posts, _id]);
  
  useEffect(() => {
    if (filteredData.length > 0 && filteredData[0].comments) {
      setComments(filteredData[0].comments);
    }
  }, [filteredData]);
  
  // Handle newly added comment
  const handleCommentAdded = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };
  
  return (
    <div className='w-full flex gap-10'>
      <Sidebar />
      <div className='w-full flex flex-col md:flex-row px-4 md:px-10 py-10 md:py-20'>
        <div className="md:w-[40%] py-5 md:py-10 px-4 md:px-10">
          {filteredData.length > 0 && (
            <>
              <img src={filteredData[0].image} className='w-80 mx-auto' alt="" />
              <p className='font-medium text-lg mt-3'>{`Name: ${filteredData[0].name}`}</p>
              <p className='font-medium text-lg mt-3'>{`Description: ${filteredData[0].description}`}</p>
              <p className='font-medium text-lg mt-3'>{`Rating: ${filteredData[0].rating}`}
                <span className='text-[10px] text-gray-400 font-light'> Remember rating is given by AI it can be misleading</span>
              </p>
            </>
          )}
        </div>
        
        <div className="md:w-[60%] px-4">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          
          {/* Add Comment Form */}
          <AddCommentForm
            postId={_id} 
            onCommentAdded={handleCommentAdded} 
          />
          
          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <CommentCard 
                  key={comment._id || index}
                  message={comment.message}
                  userId={comment.userId}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentPage;