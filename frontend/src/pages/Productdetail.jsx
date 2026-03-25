import React, { useState } from 'react'
import { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router'
import api from '../api/axios';


const Productdetail = () => {
    
    const [product, setproduct] = useState(null)
    const [qty, setQty] = useState(1);
  
    const { id }=useParams()
        
         
    const loadProduct=async()=>{
    try {
    const response=await api.get(`/product/${id}`)
        
    setproduct(response.data.product)
    } catch (error) {
    console.log(error.message);
    }
  }

    useLayoutEffect(()=>{
        loadProduct()
    },[])
    if(!product){
        return <div className='text-center mt-10 text-2xl'>Loading Product....</div>
    }

  const discountPrice =
    product.price - (product.price * product.discountPercent) / 100;

    
    const productId=product._id
    const handleAddcart=async()=>{
    try {
      const response=await api.post("/cart/add-to-cart",
        { productId })
      window.dispatchEvent(new Event ('cartUpdated'))
    } catch (error) {
      
      console.log(error.response?.data?.message || "Data not found");
      
    }
    }
  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      <div className="flex flex-col gap-4">

        <div className="bg-gray-100 rounded-xl p-6 flex justify-center">
          <div className=' overflow-hidden '>
          <img
             src={product.images}
            alt="its a"
            className="h-96 object-contain rounded-2xl hover:scale-120 transition-all duration-500"
          /></div>
        </div>

      </div>

      <div className="flex flex-col gap-4">

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-500">
          Brand: <span className="font-semibold">{product.brand}</span> | Category: {product.category}
        </p>

        <div className="flex items-center gap-2">
          ⭐⭐⭐⭐☆ <span className="text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center gap-4">

      <span className="text-3xl font-bold text-green-600">
            ₹{discountPrice}
          </span>

          <span className="line-through text-gray-500">
            ₹{product.price}
          </span>
 
          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
            {product.discountPercent ? product.discountPercent : 0} % OFF
          </span>

        </div>

        <p className="text-green-600 font-medium">
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-4">

          <span className="font-medium">Quantity:</span>

          <div className="flex border rounded">

            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-3  cursor-pointer py-1"
            >
              -
            </button>

            <span className="px-4  py-1">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 cursor-pointer py-1"
            >
              +
            </button>

          </div>

        </div>

        <div className="flex gap-4 mt-4">

          <button onClick={handleAddcart} className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded font-semibold">
            Add to Cart
          </button>

          <Link to="/cart"
          state={{move:2}}
          ><button
          onClick={handleAddcart}
           className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded font-semibold">
            Buy Now
          </button></Link>

        </div>

        <div className="border-t pt-4 mt-4 text-md font-semibold text-gray-600">

          🚚 Free Delivery in 3-5 days  
          <br />
          🔁 7 Days Replacement  
          <br />
          🔒 Secure Payment  

        </div>

      </div>

    </div>
  );
};

export default Productdetail;