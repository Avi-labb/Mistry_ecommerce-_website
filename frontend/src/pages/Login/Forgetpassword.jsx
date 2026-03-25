import React, { useState } from "react";
import { Lock, Mail, Phone, KeyRound, Eye,Check } from 'lucide-react'
import { Link } from "react-router";
import api from "../../api/axios";

const ForgotPassword = () => {

    const [identifier, setidentifier] = useState("")
    const [msg, setMsg] = useState("")
    const [mode, setmode] = useState("email")
    const [step, setstep] = useState(1)

    const [token, setToken] = useState("")
    const [hide, sethide] = useState(true)
    const [password, setpassword] = useState("")
    const [confirm_password, setconfirm_password] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!identifier) {
            setMsg("Email or phone is required")
            return
        }
        try {
            const response = await api.post("/api/forget-pass", { identifier },{withCredentials:false})

            alert("Email is verify,Click reset password!!")
            setToken(response.data.token)
            console.log(response.data.token);

            setstep(2)
            setidentifier('')
        } catch (error) {
            setMsg(error.response?.data?.message)
        }
    }

    const handlePassSubmit = async (e) => {
        e.preventDefault()

        if (!password || !confirm_password) {
            setMsg("Enter Password")
            return
        }
        if (password !== confirm_password) {
            setMsg("Password do not Match")
            return
        }
        try {
            const response = await api.post(`/api/reset-password/${token}`, { password },{withCredentials:false})
            setMsg(response.data.message)
            setpassword('')
            setconfirm_password('')
            setstep(3)

        } catch (error) {

            setMsg(error.response?.data?.message || "Password reset failed")
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative w-[400px] p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white">

                <div className="flex flex-col items-center mb-6">

                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-3xl shadow-lg">
                        <Lock />
                    </div>

                    {step === 1 && (<div className="flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mt-4">
                            Forgot Password
                        </h2>

                        <p className="text-gray-300 text-sm text-center mt-1">
                            Please enter your email address or phone number to reset your password.
                        </p>
                    </div>)}

                </div>
                {step === 1 && (<div className="flex bg-white/10 rounded-lg p-1 px-2 mb-5">
                    <button
                        onClick={() => setmode('email')}
                        className={`flex-1 p-2 rounded-md transition ${mode === 'email' ? "bg-blue-500" : "text-gray-300"}`}
                    >Email</button>
                    <button
                        onClick={() => setmode('phone')}
                        className={`flex-1 p-2 rounded-md transition ${mode === 'phone' ? "bg-blue-500" : "text-gray-300"}`}
                    >Phone</button>

                </div>
                )}

                {step === 1 && (<form onSubmit={handleSubmit} className="space-y-5">

                    <div className="flex flex-col gap-2">

                        <div className="relative">
                            <div className="-mt-1">
                                {mode === 'email' ? (<Mail className="absolute left-3 top-1/2  -translate-y-3 text-gray-300 w-5 h-5" strokeWidth={2} />) :

                                    (<Phone strokeWidth={1} className="absolute left-3 top-1/2  -translate-y-3 text-gray-300 w-5 h-5" />)}
                            </div>
                            <input
                                type={mode === 'email' ? "email" : "tel"}
                                placeholder={mode === 'email' ? ("Enter Email . . . ") : ("Enter Phone Number . . . ")}
                                value={identifier}
                                onChange={(e) => setidentifier(e.target.value)}
                                className="w-full pl-10 p-3 rounded-lg bg-white/20 border border-white/20 outline-none focus:border-indigo-400 placeholder:text-gray-300"
                            />

                        </div>

                    </div>


                    {msg && (
                        <div className="text-center text-sm text-indigo-300">
                            {msg}
                        </div>
                    )}

                    <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold tracking-wide shadow-lg">
                        Verification
                    </button>

                </form>
                )}


                {step === 2 && (<div className="flex flex-col items-center font-semibold -mt-8 mb-5">
                    <h1 className=" text-2xl font-semibold mt-4">Reset Password</h1>
                    <h1>Securely recover your account</h1>

                    {msg && (
                        <div className=" font-bold tracking-wider text-sm text-red-400">
                            {!!!msg}
                        </div>
                    )}
                </div>
                )}

                {step === 2 && (

                    <form onSubmit={handlePassSubmit}>
                        <div className="flex flex-col gap-3">
                            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                     bg-white/20 border border-white/20  ">
                                <KeyRound className="text-gray-400 w-5 h-5 shrink-0" />
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

                            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                     bg-white/20 border border-white/20  ">
                                <KeyRound className="text-gray-400 w-5 h-5 shrink-0" />
                                <input
                                    type={hide ? "password" : "text"}
                                    name="confrim_password"
                                    value={confirm_password}
                                    onChange={(e) => setconfirm_password(e.target.value)}
                                    placeholder="Confirm password"
                                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400"

                                />

                                <Eye className="cursor-pointer" strokeWidth={1} onClick={() => sethide((prev) => !prev)} />
                            </div>
                            <button className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 cursor-pointer
                     transition font-semibold tracking-wide shadow-lg">
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
                {step === 3 && (

                        <div className="">
                            <div className="flex items-center justify-center w-20 h-20 -translate-y-23 translate-x-32 rounded-full bg-green-500">
                                <Check 
                                size={40}
                                strokeWidth={5} 
                                className="text-white" />
                                </div>
                            <div className=" -mt-20 p-2 text-center">
                            <h1 className=" text-3xl font-semibold mb-2 ">
                                Password Reset Successful
                            </h1>
                            <p className="text-gray-300 text-sm mb-6">
                                Your password has been successfully updated.
                                You can now login with your new password.
                            </p>
                            </div>
                            <Link to='/login'
                                className="absolute text-center w-83 py-3  -mb-60 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-semibold tracking-wide"
                            >
                                Go Back To Login
                            </Link>

                        </div>
                )}
                <div className="mt-6 text-center text-sm text-gray-300">

                    Remember password?{" "}

                    <Link to='/login' className="text-indigo-400 cursor-pointer hover:underline">
                        Login
                    </Link>

                </div>

            </div>

        </div>

    )

}

export default ForgotPassword