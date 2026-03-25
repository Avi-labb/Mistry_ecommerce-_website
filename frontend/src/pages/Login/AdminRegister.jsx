import React, { useState } from "react";
import { User, Mail, Phone, Lock, Image, Calendar } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import api from "../../api/axios";

export default function AdminRegister() {
  const  navigate=useNavigate()
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: null,
    coverImg: null
  });
  const [msg, setmsg] = useState("")
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)

  try{
    const formdata =new FormData()
    Object.keys(form).forEach((key)=>{
      if(key!=="avatar" && key!=="coverImg"){
        formdata.append(key,form[key])
      }
    })
    if(form.avatar){
      formdata.append("avatar",form.avatar)
    } 
    if(form.coverImg){
      formdata.append("coverImg",form.coverImg)
    }
  const response = await api.post(
      "/admin/register",
      formdata,{withCredentials:false},
      
    );
    setmsg(response.data.message)
    setForm({
      firstname: "",
    lastname: "",
    age: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirm_password: "",
    avatar: null,
    coverImg: null
    })
    setLoading(false)
    navigate('/admin/login')
  }
  catch(error){
    setmsg(error.response?.data?.message)
    console.log(error)
    setLoading(false)
    return
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-600 p-6">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl py-8 text-white">
        <div className="flex items-center justify-center gap-5">
        <h1 className="text-3xl font-bold mb-4 text-black text-center tracking-wide">
          Admin Registration
        </h1>
        <button
        className="flex sm:absolute  sm:ml-150 bg-red-400 px-4 py-2  rounded-md hover:bg-red-600 cursor-pointer font-semibold hover:scale-98  "
        ><NavLink to="/admin/login">Login</NavLink></button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 px-10 sm:px-25  md:grid-cols-2 gap-2"
        >
        
          <Input  label="First Name" icon={<User size={18}  className="text-black" />}
           name="firstname" 

           value={form.firstname}
          onChange={handleChange} />

          <Input label="Last Name" icon={<User size={18} className="text-black"/>} name="lastname" value={form.lastname} onChange={handleChange} />

          <Input label="Age" icon={<Calendar size={18} className="text-black" />} name="age" type="tel" value={form.age} onChange={handleChange} />

          <Input label="Username" icon={<User size={18} className="text-black" />} name="username" value={form.username} onChange={handleChange} />

          <Input label="Phone Number" icon={<Phone size={18} className="text-black" />} name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

          <Input label="Email" icon={<Mail size={18} className="text-black" />} name="email" type="email" value={form.email} onChange={handleChange} />

          <Input label="Password" icon={<Lock size={18} className="text-black" />} name="password" type="password" value={form.password} onChange={handleChange} />

          <Input label="Confirm Password" icon={<Lock size={18} className="text-black" />} name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} />

          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-semibold">Avatar</label>
            <div className="flex items-center text-zinc-100 gap-3 bg-white/10 border border-white/20 p-3 rounded-xl">
              <Image size={22} className="text-black" />
              <input type="file" name="avatar" onChange={handleChange} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-black font-semibold">Cover Image</label>
            <div className="flex text-zinc-100 items-center gap-3 bg-white/10 border border-white/20 p-3 rounded-xl">
              <Image size={18} className="text-black" />
              <input type="file" name="coverImg" onChange={handleChange} />
            </div>
          </div>

          
           <div className="md:col-span-2 mt-4">
            <button
              disabled={loading}
              className="w-full cursor-pointer py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold text-lg hover:scale-[0.96] transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating Admin...
                </>
              ) : (
                "Create Admin Account"
              )}
            </button>
            {msg &&(<h1 className="text-center text-black font-bold mt-2 uppercase">▪️▪️{msg}</h1>)}
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-black font-semibold">{label}</label>
      <div className="flex  items-center gap-3 bg-white/10 border border-white/20 p-3 rounded-xl">
        {icon}
        <input
          {...props}
          className="bg-transparent  outline-none w-full text-black font-semibold placeholder-gray-300"
        />
      </div>
    </div>
  );
}

