import { MapPin, PhoneCall, X, GpuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AddressForm({ setactive,loadaddress,id,isEdit,formdata }) {
    const [error, seterror] = useState("")
    const [form, setform] = useState({
    name: "",
    phonenumber: "",
    building_name: "",
    road_name: "",
    near_by: "",
    city: "",
    pin: "",
    state: "",
  })

    const handleform = (e) => {
        const { name, value } = e.target
        
        setform((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    
useEffect(() => {
  if (isEdit && formdata) {
    setform(formdata);
  }
}, [formdata, isEdit]);


    const handlesubmit = async (e) => {
        e.preventDefault()
        
        try {if(isEdit){
            const response = await api.put(`/address/update/${id}`, form)
        }else{
            const response = await api.post("/address/add", form)
            
            setform({
                name: "",
                phonenumber: "",
                building_name: "",
                road_name: "",
                near_by: "",
                city: "",
                pin: "",
                state: "",
            })
        }
            setactive(false)
            loadaddress()
            seterror(response.data.message)
        } catch (error) {
                
            seterror(error.response?.data?.message || "Failed to add");
        
        }
    }

    return (
        <div className="absolute h-screen   bg-amber-50 right-0 overflow-hidden w-[440px]">
            
            <form onSubmit={handlesubmit} className="max-w-xl mx-auto p-4 bg-white">
                {error && <div className='absolute shadow mt-2 bg-white/30 animate-fade-in border p-2 rounded-sm w-fit text-red-500 uppercase font-semibold right-2'>{error}</div>}
                <div className="flex justify-between font-semibold p-2">
                    <h1>ADD DELIVERY ADDRESS</h1><X className="cursor-pointer" onClick={() => setactive(false)} />
                </div>
                
                <hr className="text-zinc-400" />

                <div className="flex justify-between mt-2 p-2">
                    <h1 className="flex items-center font-semibold gap-1">
                        <PhoneCall className="text-blue-700" size={20} />
                        Contact details
                    </h1>
                    <div className="border flex items-center p-1 text-pink-600 gap-1 justify-center rounded-sm">
                        <GpuIcon size={15} />
                        <h1 className="text-sm">Use My location</h1>
                    </div>
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleform}
                        placeholder="Name"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        name="phonenumber"
                        value={form.phonenumber}
                        onChange={handleform}
                        placeholder="Contact Number"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                    <MapPin size={16} className="text-blue-500" />
                    <span>Address</span>
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        name="building_name"
                        value={form.building_name}
                        onChange={handleform}
                        placeholder="House no./ Building name"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        name="road_name"
                        value={form.road_name}
                        onChange={handleform}
                        placeholder="Road name / Area / Colony"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        name="pin"
                        value={form.pin}
                        onChange={handleform}
                        placeholder="Pincode"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>

                <div className="flex gap-4 mb-5">
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleform}
                        placeholder="City"
                        className="w-1/2 border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />

                    <select
                        name="state"
                        value={form.state}
                        onChange={handleform}
                        className="w-1/2 border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm bg-transparent"
                    >
                        <option value="">State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        name="near_by"
                        value={form.near_by}
                        onChange={handleform}
                        placeholder="Nearby Famous Place/Shop/School,etc.(optional)"
                        className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
                    />
                </div>
                <button
                    className="bg-pink-700 w-full p-2 cursor-pointer text-white text-center">{isEdit ? "Updated Address": "Save Address and Continue"}</button>
            </form>
        </div>
    );
}