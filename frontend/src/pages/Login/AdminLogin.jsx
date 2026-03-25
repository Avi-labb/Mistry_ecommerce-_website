import { Eye, KeyRound, Mail, LockKeyhole, Underline } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../api/axios";

const AdminLogin = () => {

  const navigate = useNavigate()

  const [flip, setFlip] = useState(false);
  const [show, setshow] = useState(false)
  const [msg, setmsg] = useState("")
  const [form, setform] = useState({
    identifier:"",
    password:"",
  })

  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitlogin = async (e) => {
    e.preventDefault()
    try {
       const response = await api.post("/admin/login", form)
      setmsg(response.data.message)
      setform({
        identifier: "",
        password: ""
      })
      navigate('/')
    } catch (error) {
      setmsg(error.response?.data?.message || "Login Failed☠️☠️")
    }
  }


  const [identity, setidentity] = useState("")
  const [link, setLink] = useState("")
  const [hide, sethide] = useState(false)

  const handlelink = async (e) => {

    e.preventDefault()

    try {
      const res = await api.post("/admin/forget-password", {identity},
        {withCredentials:false}
      )
      setmsg(res.data.message)
      setLink(res.data.link);
      console.log(res.data);
      
      setidentity("")
    } catch (error) {
      setmsg(error.res?.data?.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/Images/1 (3).jpg')"
      }}
      >

      <div className="w-[850px] h-[500px] bg-white shadow-2xl rounded-xl flex overflow-hidden">

        <div className=" hidden sm:flex group w-1/2 bg-white p-12 flex flex-col justify-center border border-zinc-400">

          <div className="mb-6"><h1 className=" text-red-500 font-bold text-2xl -mt-5">MISTRY.STORE</h1></div>

          <h1 className="text-3xl font-bold mb-6">
            Welcome to The <span className="font-bold tracking-tighter ">🅼🅸🆂🆃🆁🆈
          </span> Admin Area
          </h1>

          <p className="text-gray-600 text-md mb-6 font-semibold">
            To request an account, just call us
          </p>

          <div className="solid flex items-center gap-5 space-y-2 font-semibold">
            <img className="w-20 h-20 bg-cover" src="/adminbgcontact.gif" alt="" />
            <div className="flex flex-col">
            <p className="">
              +245 04 166 0355
            </p>
            <p className="">
              +347 42 390 2456
            </p>
            </div>
          </div>
          
        </div>
      
        <div className="w-1/2 -mt-5 flex flex-col items-center gap-4 justify-center perspective">

          {msg && (<h1 className="text-center text-red-600 tracking-wide font-semibold ">💀💀{msg}
          </h1>)}

          <div
            className={`relative w-[320px] h-[360px]  transition-transform duration-700 transform-style ${flip ? "rotate-y-180" : ""
              }`}
          >
            <form onSubmit={submitlogin}>
              <div className="absolute w-full h-full bg-white shadow-2xl rounded-xl px-8 py-4 backface-hidden ">
                <h2 className="text-2xl text-center  font-bold mb-2">Log in</h2>
                <p className="text-gray-600 font-semibold tracking-wider text-sm  text-center mb-6">
                  Secure system login
                </p>
                <div className='flex flex-col gap-1 mb-5'>
                  <label className="ml-1 mb-1 text-sm font-semibold tracking-wider text-red-500">
                    EMAIL OR USERNAME
                  </label>
                  <div className='w-full flex items-center gap-3 px-2 py-3 rounded-xl  border '>

                    <Mail className='text-gray-400 w-5 h-5 shrink-0' />
                    <input
                      type="text"
                      name="identifier"
                      value={form.identifier}
                      onChange={handlechange}
                      placeholder="Email or username"
                      className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div >
                <div className="flex items-center justify-center p-2  rounded-xl border-2">
                  <KeyRound className="text-gray-400 w-5 h-5 shrink-0" />
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handlechange}
                    placeholder="Password"
                    className="w-full bg-transparent outline-none  p-1 text-gray-900 placeholder-gray-400"
                  />
                  <Eye onClick={()=>setshow(!show)} className="cursor-pointer" strokeWidth={1} />
                </div>

                <p
                  onClick={() => setFlip(true)}
                  className="text-red-500 font-semibold text-sm cursor-pointer mb-3 mt-1 text-right"
                >
                  Forgot password?
                </p>

                <button className="w-full bg-red-500 font-semibold text-white py-3 rounded-md hover:bg-red-600 hover:scale-95 cursor-pointer">
                  Log in
                </button>
              </div>
            </form>

            <div className=" w-full h-full bg-white shadow-2xl rounded-xl px-8 py-10 rotate-y-180 backface-hidden">
              <form onSubmit={handlelink}>

                <div className="flex items-center gap-3">
                  <LockKeyhole className="text-red-500" size={30} strokeWidth={1.5} />
                  <h2 className="text-2xl text-center  tracking-wide font-bold ">
                    Change Password
                  </h2></div>

                <p className="text-gray-500 text-center ml-7  tracking-tighter font-semibold text-sm mb-8">
                  Securly Change your Password
                </p>

                <div className='group flex flex-col gap-1 mb-5'>
                  <label className="ml-1 mb-1 text-sm font-semibold tracking-wider text-red-500">
                    EMAIL OR USERNAME
                  </label>
                  <div className='w-full flex items-center gap-3 px-2 py-3 rounded-xl   '>

                    <Mail className='text-gray-400 w-5 h-5 shrink-0' />
                    <input
                      type="text"
                      name="identity"
                      value={identity}
                      onChange={(e) => setidentity(e.target.value)}
                      placeholder="Email or username"
                      className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div className="h-[2px] w-0 bg-red-500 -mt-3 group-hover:w-[240px] transition-all duration-700"></div>
                </div>
                <button onClick={()=>sethide(!hide)} className="w-full font-semibold bg-red-500 text-white py-3 rounded-md mb-4">
                  Send Reset Link
                </button>

                <p
                  onClick={() => setFlip(false)}
                  className="text-sm text-gray-800 font-semibold  hover:underline text-center cursor-pointer"
                >
                  Back to Login
                </p>
               {hide && <Link to={link}><div className="text-center  p-2 w-20 mt-2  rounded-md font-semibold bg-red-500 text-white" >LINK</div></Link>}
              </form>

            </div>
          </div>
          <Link to="/admin/register">
          <h1 className="font-semibold">Don't have account? <span className="hover:underline cursor-pointer text-blue-700 font-semibold">Register</span></h1></Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;