import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddCommentForm = ({ postId, onCommentAdded }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { BACKEND_URL, user ,token } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await axios.post(`${BACKEND_URL}/api/posts/comment/add`, {
        postId,
        comment:message
      },{headers:{token}});
      
      console.log('Comment added:', response.data);
      
      // Clear form and notify parent component
      setMessage('');
      if (onCommentAdded && typeof onCommentAdded === 'function') {
        onCommentAdded(response.data);
      }
      
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.message || 'Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-medium mb-3">Add a Comment</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-3">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 min-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm;