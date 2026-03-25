import React, { useState } from "react";
import api from "../api/axios";

const AdminCreateProduct = () => {


  const [msg, setmsg] = useState("")
  const [loading, setloading] = useState(false)

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    discountPercent: "",
    isSale: false,
    images:null
  });

  const handledata=(e)=>{
    const {name,value,checked,files,type}=e.target
    if(type==="file"){
      setProduct({...product,[name]:files[0]})
    }
    else if(type==="checkbox"){
      setProduct({...product,[name]:checked})
    }
    else{  
      setProduct({...product,[name]:value})
    }
  }

  const handlesubmit=async(e)=>{
    e.preventDefault()    
    setloading(true)
    try {
    const formdata=new FormData()
      Object.keys(product).forEach((key)=>{
        if(key!=='images'){
        formdata.append(key,product[key])
        }
      })
      if(product.images){
        formdata.append("images",product.images)
      }

   const response= await api.post("/product/create",formdata)
   setmsg(response.data.message)   
   setProduct({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    discountPercent: "",
    isSale: false,
    images:null
   })
   setloading(false)
    } catch (error) {
      setmsg(error.response?.data?.message || "Product not created")
      setloading(false)
    }
  }
  return (
    <div className="min-h-screen flex  bg-gray-100 p-10 bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-300">

      <div className="max-w-3xl mx-auto bg-transparent  shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
        Create Product
        </h2>

        <form onSubmit={handlesubmit} className="grid gap-6">

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handledata}
              placeholder="Product Name"
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            />

            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handledata}
              placeholder="Brand"
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            />

          </div>

          <div className="grid grid-cols-3 gap-4">

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handledata}
              placeholder="Price"
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            />

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handledata}
              placeholder="Stock"
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            />

            <select
              name="category"
              value={product.category}
              onChange={handledata}
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            >
              <option value="">Category</option>
              <option value="Bags">Bags</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Clocks">Clocks</option>
            </select>

          </div>

          <textarea
            name="description"
            value={product.description}
            onChange={handledata}
            placeholder="Product Description"
            className="border p-3 rounded-lg outline-none placeholder:text-black"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              value={product.discountPercent}
              onChange={handledata}
              name="discountPercent"
              placeholder="Discount %"
              className="border p-3 rounded-lg outline-none placeholder:text-black"
            />

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isSale"
                checked={product.isSale}
                onChange={handledata}
              />

              On Sale

            </label>

          </div>


          <div>

            <input
              type="file"
              name="images"
              onChange={handledata}              
              className="border p-3 rounded-lg outline-none placeholder:text-black w-full"
            />

          </div>


          <button
            className="bg-black flex justify-center gap-2 text-white py-3 rounded hover:bg-gray-900 transition"
          >
            {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                 <h1>Creating Product...</h1>
                </>
              ) : (
                 <h1>Create Product</h1>
                
              )}
          </button>
              {msg && (<div className="-mt-5 text-center font-bold uppercase">{msg}</div>)}
        </form>

      </div>
      <div className="hidden max-w-md -ml-35 mr-20  sm:flex ">
        <img src="/five.jpg" className="object-fit bg-cover rounded-2xl" alt="" />
      </div>

    </div>
  );
};

export default AdminCreateProduct;