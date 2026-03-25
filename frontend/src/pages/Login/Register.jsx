import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import api from "../../api/axios";

const Register = () => {

  const [formdata, setformdata] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm_password: ""
  })

  const handlerform = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const [errors, setErrors] = useState("")
  const validateForm = () => {

  const eamilRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  let newErrors = {}

  if (!formdata.fullname.trim()) {
    newErrors.fullname = "Full name is required"
  }

  if (!formdata.phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required"
  }

  if (!formdata.email.trim()) {
    newErrors.email = "Email is required"
  } else if (!eamilRegex.test(formdata.email)) {
    newErrors.email = "Invalid email address"
  }

  if (!formdata.password) {
    newErrors.password = "Password is required"
  } else if (formdata.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters"
  }

  if (formdata.confirm_password !== formdata.password) {
    newErrors.confirm_password = "Passwords do not match"
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}

  const [msg, setmsg] = useState('')

  const handlesubmit = async (e) => {
    e.preventDefault()
    if(!validateForm()) return
    try {
      const response = await api.post('/api/register', formdata,{withCredentials:false})
      setmsg(response.data.message)
      setformdata({
        fullname: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirm_password: ""
      })

    } catch (error) {
      setmsg(error.response?.data?.message || "An error Occurred")
    }

  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/Images/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative sm:w-[420px] w-[370px] px-8 py-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl text-white">

        <h1 className="text-xl font-semibold text-center mb-3 tracking-wide">
          CREATE ACCOUNT
        </h1>
        {msg && <div className="text-red-500 text-lg px-3 -mt-2 font-semibold text-end">{msg}</div>}
        
        <form onSubmit={handlesubmit} className="space-y-3">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formdata.phoneNumber}
              onChange={handlerform}
              placeholder="Enter your Number"
              className="p-2 rounded-lg bg-white/20 outline-none border border-white/20 focus:border-white placeholder:text-gray-300"
            />
          {errors && <label className="text-[12px] -mt-1 ml-2 text-red-400">{errors.phoneNumber}</label>}  
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formdata.fullname}
              onChange={handlerform}
              placeholder="Enter your fullname"
              className="p-2 rounded-lg bg-white/20 outline-none border border-white/20 focus:border-white placeholder:text-gray-300"
            />
            {errors && <label className="text-[12px] -mt-1 ml-2 text-red-400">{errors.fullname}</label>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlerform}
              placeholder="example@email.com"
              className="p-2 rounded-lg bg-white/20 outline-none border border-white/20 focus:border-white placeholder:text-gray-300"
            />
            {errors && <label className="text-[12px] -mt-1 ml-2 text-red-400">{errors.email}</label>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlerform}
              placeholder="Enter password"
              className="p-2 rounded-lg bg-white/20 outline-none border border-white/20 focus:border-white placeholder:text-gray-300"
            />
            {errors && <label className="text-[12px] -mt-1 ml-2 text-red-400">{errors.password}</label>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formdata.confirm_password}
              onChange={handlerform}
              placeholder="Confirm password"
              className="p-2  rounded-lg bg-white/20 outline-none border border-white/20 focus:border-white placeholder:text-gray-300"
            />
            {errors && <label className="text-[12px] -mt-1 ml-2 text-red-400">{errors.confirm_password}</label>}
          </div>

          <button className="w-full py-3 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-500 hover:scale-97 transition font-semibold tracking-wide">
            Register
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 cursor-pointer hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;