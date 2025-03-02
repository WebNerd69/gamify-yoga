import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddPost = () => {
     const { BACKEND_URL, token, addImage , reloadPosts } = useContext(AppContext)
     const [name, setName] = useState('')
     const [description, setDescription] = useState('')
     const [image, setImage] = useState(null) // Changed from false to null to correctly handle file input

     const onSubmitHandler = async (e) => {
          e.preventDefault()
          try {
               const formData = new FormData()
               formData.append('name', name)
               formData.append('description', description)
               if (image) { // Check if image is not null before appending
                    formData.append('image', image)
               }

               const response = await axios.post(BACKEND_URL + '/api/posts/add', formData, { headers: {token}})
               console.log(response)
               if (response.data.success) {
                    toast.success(response.data.message)
                    setName("")
                    setDescription('')
                    setImage(null) // Reset image state to null after successful submission

               } else {
                    toast.error("Failed to post, fill the form carefully.")
               }
          } catch (error) {
               console.error(error.message) // Changed from console.log to console.error for better error handling
               toast.error(error.message)
          }
     }

     return (
          <form onSubmit={onSubmitHandler} className='px-10 py-4 flex items-center justify-evenly w-[80%] flex-col bg-opacity-40 backdrop-blur-lg bg-white absolute bottom-0 mx-auto'>
               <p onClick={()=>reloadPosts()} className='color-bg text-gray-200 px-5 py-2 rounded-full hover:text-white font-medium transition-all duration-150 cursor-pointer'><i className="ri-arrow-up-long-line"></i>Load new Posts</p>
               <div className='px-10 py-4 flex items-center justify-between w-[90%] gap-6'>

                    <label htmlFor="image" className='w-14 h-14 rounded-lg flex items-center justify-center border-2 border-dashed border-[#454343aa]'>
                         <img src={!image ? addImage : URL.createObjectURL(image)} alt="" className={!image ? 'w-6' : 'w-12 object-fill'} />
                         <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className='hidden' />
                    </label>
                    <input
                         type="text"
                         placeholder='Asan name'
                         className='px-5 py-3 rounded-lg outline-[#3a393acf] border w-1/2'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         required
                    />
                    <input
                         type="text"
                         placeholder='Add description'
                         className='px-5 py-3 rounded-lg outline-[#3a393acf] border w-1/2'
                         value={description}
                         onChange={(e) => setDescription(e.target.value)}
                         required
                    />
               <button type='submit'><i className="ri-send-plane-fill text-3xl text-purple-500 hover:text-purple-700 cursor-pointer"></i></button>
               </div>

          </form>
     )
}

export default AddPost