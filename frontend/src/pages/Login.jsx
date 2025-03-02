import React, { useContext, useState } from 'react'
import axios from "axios"
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
const Login = () => {
  // state variables
  const [currentState, setCurrentState] = useState('Signup')
  const [name, setName] = useState('')
  const [password, setpassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')

  const { BACKEND_URL, token, setToken , navigate} = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (currentState === "Login") {

        const response = await axios.post(BACKEND_URL + "/api/users/login", { email, password });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token);
          navigate("/")
        } else {
          toast.error(response.data.message) // Changed from toast.error to console.error for debugging
        }
      }
      else {
        const response = await axios.post(BACKEND_URL + "/api/users/register", { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setCurrentState("Login")
        } else {
          toast.error(response.data.message) // Changed from toast.error to console.error for debugging
        }
      }
    } catch (error) {
      toast.error(`Error submitting form: ${error.message}`);
      console.log(error)
    }
  }
  return (
    <div className='w-screen h-[100vh] flex justify-center items-center px-10 text-gray-700'>
      <form onSubmit={(e) => onSubmitHandler(e)} className='md:w-1/3 w-full px-20 py-5 rounded-lg shadow-lg flex  justify-evenly items-center bg-white flex-col gap-4 min-w-[480px] min-h-[640px]' >
        <div className="texts w-full">
          {currentState === "Signup" && <p className='text-3xl font-medium'>{currentState}</p>}
          {currentState === "Login" && <p className='text-3xl font-medium'>Welcome Back</p>}
          {currentState === "Signup" && <p className='text-sm text-gray-400 mt-3 w-3/4'>Kickstart your amazing yoga journey with our lovely community.</p>}

        </div>
        <div className="w-full flex flex-col items-center">
          {currentState === 'Signup' && <div className="w-full ">
            <label htmlFor="name" className='font-semibold mb-4 text-sm text-gray-500'>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="name" className='border rounded-lg outline-none px-4 py-2 w-full' placeholder='Enter your name' />
          </div>}
          <div className="w-full">
            <label htmlFor="email" className='font-semibold mb-4 text-sm text-gray-500'>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className='border rounded-lg outline-none px-4 py-2 w-full' placeholder='example@domain.com' />
          </div>
          <div className="w-full">
            <label htmlFor="password" className='font-semibold mb-4 text-sm text-gray-500'>Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-4 py-1">
              <input type={`${!passwordVisible ? "password" : "text"}`} onChange={(e) => setpassword(e.target.value)} value={password} id="password" className=' outline-none  w-full' placeholder='Password' />
              <i class={`text-purple-500 ${!passwordVisible ? "ri-eye-line" : "ri-eye-close-line"} hover:text-purple-700 text-2xl cursor-pointer`} onClick={() => setPasswordVisible(!passwordVisible)}></i>
            </div>
          </div>
          <button type="submit" className='h-14 font-medium rounded-full color-bg text-white tracking-wide mt-8 w-3/4 hover:text-xl transition-all duration-150 ease-in-out'>{currentState}</button>
          <div className=" text-sm text-purple-500 hover:text-purple-700 cursor-pointer">
            <p onClick={() => { currentState === "Signup" ? setCurrentState("Login") : setCurrentState("Signup") }}>{`${currentState === "Signup" ? "Already have an account? Login" : "Create an account"}`}</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login