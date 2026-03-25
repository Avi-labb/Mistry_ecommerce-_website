import { GpuIcon, Grid2X2Plus, PhoneCall, Search, X } from "lucide-react";
import AddressForm from "./Addressform";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AddressUI({ setmove,setaddressId }) {

  const [active, setactive] = useState(false)
  const [selectID, setselectID] = useState(null)
  const [search, setsearch] = useState("")
  const [datas, setdatas] = useState([])

  const filteredData = datas.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchValue) ||
      item.phonenumber?.toString().includes(searchValue)
    );
  });

  const loadaddress = async () => {
    try {
      const response = await api.get("/address/get")
      setdatas(response.data.address);

    } catch (error) {
      console.log(error.message);

    }
  }

  useEffect(() => {
    loadaddress()
  }, [])



  const [isEdit, setisEdit] = useState(false)
  const [formdata, setformdata] = useState()

  const Addadd = () => {
    setactive(true)
    setisEdit(false)
  }

  const handleEdit = (data) => {
    setformdata({
      name: data.name || "",
      phonenumber: data.phonenumber || "",
      building_name: data.building_name || "",
      road_name: data.road_name || "",
      near_by: data.near_by || "",
      city: data.city || "",
      pin: data.pin || "",
      state: data.state || "",
    });
    setactive(true)
    setisEdit(true)
  }


  return (
    <div className="w-full max-w-xl mx-auto  bg-white">

      {active && (<div className="absolute bg-black/50 inset-0 z-50">
        <AddressForm
          loadaddress={loadaddress}
          setactive={setactive}
          id={selectID}
          formdata={formdata}
          isEdit={isEdit} />
      </div>)}

      <div className="border rounded-md flex items-center px-3 py-2 text-gray-500">
        <Search size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search Address by Name or Phone Number"
          className="ml-2 w-full outline-none text-sm"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <h2 className="font-medium text-gray-800">Select Delivery Address</h2>
        <button
          onClick={Addadd}
          className="text-pink-600 cursor-pointer font-medium text-sm">
          + ADD NEW ADDRESS
        </button>
      </div>

      {filteredData.map((data, idx) => (

        <div key={idx}
          onClick={() => {
            setaddressId(data._id)
            setselectID(data._id)}}
          className={`mt-4 rounded-lg p-4 cursor-pointer transition
        ${selectID === data._id
              ? "bg-blue-100 border border-blue-500"
              : "bg-gray-200"
            }`}>

          <div className="flex justify-between items-start">
            <div className="group flex items-center gap-2">
              <input type="radio"
                name="address"
                checked={selectID === data._id}
                readOnly
              />
              <span className="font-semibold text-gray-800">{data.name}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(data)
                setselectID(data._id)
              }}
              className=" text-pink-600 cursor-pointer text-sm font-medium">
              EDIT
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {data.building_name},{data.road_name},{data.near_by},{data.city},{data.state},{data.pin}
          </p>

          <p className="text-sm text-gray-700 mt-2">{data.phonenumber}</p>

          <button
            onClick={() => setmove((prev) => prev + 1)}
            className="w-full mt-4 cursor-pointer bg-pink-700 hover:bg-pink-800 text-white py-2 rounded-md transition">
            Deliver to this Address
          </button>
        </div>
      ))}
    </div>
  );
}