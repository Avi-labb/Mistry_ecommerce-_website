import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

const AdminProfile = () => {

    const fileRef = useRef()

    const [editMode, setEditMode] = useState(false);
    const [preview, setPreview] = useState(false);
    const [msg, setmsg] = useState("")

    useEffect(() => {
        const loadadmin = async () => {
            const response = await api.get("/admin/getadmin")
            
            setAdmin((prev) => ({
                ...prev,
                ...response.data.admin
            }))

        }
        loadadmin()
    }, [])
    const [admin, setAdmin] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        phoneNumber: "",
        avatar:""
    });

    const handleChange = (e) => {
        const { name, value,type } = e.target;
        if(type==="file"){
            setAdmin({...admin,[name]:files[0]})
        }else{
        setAdmin({ ...admin, [name]: value })}
    };

    const profilepic = async (file) => {
        try {

            const formData = new FormData();
            formData.append("avatar", file);

            const response = await api.post("/admin/update-avatar",formData)

            setAdmin((prev)=>({
                ...prev,
                avatar:response.data.avatar
            }))
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    const handleform = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("/admin/update-profile", admin )

            setmsg(response.data.message)

        } catch (error) {
            setmsg(error.response?.data?.message || "Not Updated")
        }
    }

    const [showReset, setShowReset] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldpassword: "",
        newpassword: "",
        confirm_password: ""
    });

    const handlePasswordChange = async (e) => {
        const { name, value } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const passwordsubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post("/admin/changed-password", passwordData)
            setmsg(response.data.message)
            setPasswordData({
                oldpassword: "",
                newpassword: "",
                confirm_password: ""
            })
        } catch (error) {
            setmsg(error.response?.data?.message || "passowrd not  updated")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {preview && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setPreview(false)}
                >
                    <img
                    src={admin.avatar}
                     className="w-68 h-68 rounded-full border-4 border-white cursor-pointer"
                        />
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">

                <motion.div
                    initial={{ x: -800, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white rounded-2xl transition-all duration-100 shadow p-6"
                >
                    <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                        
                        
                        <div className="absolute -bottom-12 left-6">
                            <div className="relative ">
                                <img
                                    src={admin.avatar}
                                    onClick={() => setPreview(true)}
                                    className="w-28 h-28 rounded-full border-4 border-white cursor-pointer"
                                />

                                <button
                                    onClick={() => fileRef.current.click()}
                                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:scale-110 transition">
                                    ✏️
                                </button>
                                <input
                                    type="file"
                                    ref={fileRef}
                                    className="hidden"
                                    onChange={(e) => {profilepic(e.target.files[0])
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {msg && (<h1 className="text-end font-semibold text-red-500 uppercase  mt-5">👍{msg}</h1>)}
                    <div className="mt-16 grid grid-cols-2">
                        <div>
                            {editMode ? (<div className="flex gap-26 font-semibold">
                                <label htmlFor="">firstName</label>
                                <label htmlFor="">lastName</label>
                            </div>) : (<h1>Fullname</h1>)}
                            {editMode ? (
                                <div className="flex gap-2">
                                    <input
                                        name="firstname"
                                        value={admin.firstname}
                                        onChange={handleChange}
                                        className="border p-2 rounded w-full"
                                    />
                                    <input type="text"
                                        name="lastname"
                                        value={admin.lastname}
                                        onChange={handleChange}
                                        className="border p-2  rounded w-full"
                                    /></div>
                            ) : (
                                <h1 className="text-xl font-bold">{admin.firstname}{admin.lastname}</h1>
                            )}

                            <p className="text-gray-500">@{admin.username}</p>

                            <div className="mt-6 grid gap-4">

                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    {editMode ? (
                                        <input
                                            name="email"
                                            value={admin.email}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    ) : (
                                        <p>{admin.email}</p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    {editMode ? (
                                        <input
                                            name="phoneNumber"
                                            value={admin.phoneNumber}
                                            onChange={handleChange}
                                            className="border p-2 rounded w-full"
                                        />
                                    ) : (
                                        <p>{admin.phoneNumber}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button

                                    onClick={() => setEditMode(!editMode)}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                                >
                                    {editMode ? "Cancel" : "Edit Profile"}
                                </button>

                                {editMode && (
                                    <button
                                        onClick={(e) => {
                                            handleform(e)
                                            setEditMode(false)
                                        }}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                        Save
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={() => setShowReset(!showReset)}
                                className="mt-4 text-red-500 hover:underline"
                            >
                                Reset Password
                            </button>
                        </div>
                        <div>
                            {showReset && (
                                <form onSubmit={passwordsubmit} className="mt-4 bg-white p-4 rounded-lg space-y-3">

                                    <input
                                        type="password"
                                        name="oldpassword"
                                        placeholder="Old Password"
                                        value={passwordData.oldpassword}
                                        onChange={handlePasswordChange}
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="password"
                                        name="newpassword"
                                        placeholder="New Password"
                                        value={passwordData.newpassword}
                                        onChange={handlePasswordChange}
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="password"
                                        name="confirm_password"
                                        placeholder="Confirm Password"
                                        value={passwordData.confirm_password}
                                        onChange={handlePasswordChange}
                                        className="w-full border p-2 rounded"
                                    />

                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Save Password
                                    </button>
                                </form>
                            )}</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 700, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="hidden sm:flex bg-white rounded-2xl shadow p-6 flex flex-col justify-center transition-all duration-500 items-center"
                >
                    <h2 className="text-lg font-semibold mb-4">
                        Admin Activity
                    </h2>

                    <img
                        src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                        alt="dashboard animation"
                        className="w-64 rounded-lg"
                    />

                    <div className="mt-6 text-sm text-gray-600 space-y-2">
                        <p>✔ Managing products efficiently</p>
                        <p>✔ Monitoring user activity</p>
                        <p>✔ Handling orders smoothly</p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default AdminProfile;