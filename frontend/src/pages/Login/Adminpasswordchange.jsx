import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ChangePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("")
  const [timeLeft, setTimeLeft] = useState(120); 
  const inputsRef = useRef([]);

  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
  });
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleform=async(e)=>{
    e.preventDefault()

    try {
      
      const response=await api.post(`/admin/reset-password/${token}`,form)      
      setMsg(response.data.message)
      setForm({
        password:"",
        confirm_password:""
      })
      
    } catch (error) {
      setMsg(error.response?.data?.message || "UI Error")
    }
  }

  
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/admin/login");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);


  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-[400px] p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        
        {msg &&(<div className="text-center  text-sm underline text-yellow-200 font-semibold mb-2 uppercase">💀💀{msg}☠️☠️</div>)}

        <h2 className="text-2xl font-bold text-center mb-2">
          Change Password
        </h2>

        <p className="text-center font-semibold text-red-400 mb-6">
          Expires in {formatTime()}🕑
        </p>
    <form onSubmit={handleform} action="">

        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="New Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-black/30 border border-white/30 focus:outline-none"
        />
        <input
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-black/30 border border-white/30 focus:outline-none"
        />

        <button
    
          className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"

          
        >
          Update Password
        </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;