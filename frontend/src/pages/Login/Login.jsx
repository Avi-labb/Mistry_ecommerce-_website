import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import {KeyRound,Eye, Mail} from 'lucide-react'
import api from '../../api/axios'

const Login = () => {
  
  const navigate=useNavigate()
  
  const [identifier, setidentifier] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const [hide, sethide] = useState(true)

  const validation = () => {
    if (!password) {
      seterror("Password is required")
      return false
    }
    seterror("")
    return true
  }

    const handlesubmit = async (e) => {
      e.preventDefault()
      if (!validation) return
      try {
        const response = await api.post("/api/login", {
          identifier,
          password
        }
      )
        
        const fullname=response.data.user.fullname

        localStorage.setItem("fullname",fullname)
        seterror(response.data.message)

      setidentifier("")
      setpassword("")
      
        navigate('/')      
    } catch (error) {
      seterror(error.response?.data?.message || "Login Failed!!!!")
    }
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center sm:justify-end bg-cover bg-center"
      style={{ backgroundImage: "url('/Images/loginbg.avif')" }}
    >
      <div className="mr-0 sm:mr-50 relative sm:w-[420px] w-[370px] px-8 py-12 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl text-white">

          {error && <div className='absolute shadow mt-2 animate-fade-in border p-2 rounded-sm w-fit text-red-500 uppercase font-semibold right-2'>{error}</div>}
        <form onSubmit={handlesubmit} className="space-y-4">

          <h1 className="text-2xl font-semibold text-center -mt-4 mb-6">
            Login
          </h1>
          
          <div className='flex flex-col gap-1'>
            <label className="ml-1 text-md text-gray-200">
              Email or PhoneNumber
            </label>
            <div className='w-full flex items-center gap-3 px-4 py-3 rounded-lg  bg-white/20 border border-white/20  '>
              <Mail className='text-gray-300 w-5 h-5 shrink-0'/>
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => setidentifier(e.target.value)}
              placeholder="example@email.com"
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
            </div>
          </div >

          <div className='flex flex-col gap-'>  
          <label className=" ml-1  text-md text-gray-200">
              Password
            </label>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg  bg-white/20 border border-white/20  ">
            
            <KeyRound className="text-gray-300 w-5 h-5 shrink-0" />
            <input
              type={hide ? "password" : "text"}
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
            <Eye className="cursor-pointer" strokeWidth={1} onClick={() => sethide((prev) => !prev)} />
          </div>
          </div>
          <div className="flex justify-end ">
            <Link
              to="/password/forget"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="w-full py-3 cursor-pointer bg-blue-600 rounded-lg hover:bg-blue-500 transition">
            Login
          </button>

          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline"
            >
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login