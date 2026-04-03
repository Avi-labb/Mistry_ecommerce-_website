import React, { useEffect, useState } from 'react'
import api from '../api/axios'
export default ViewOrder = () => {
     const [orders, setorders] = useState("")
    
    const loaddata=async()=>{
        try {
            
            const response=await api.get("/order/get",
            )
            setorders(response.data.orders)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        loaddata()
    },[])
  return (
    <div>
        <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No Orders Found 😕
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order._id}</p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    <img
                      src={item.product.images}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium">{item.product.name}</h2>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">₹{item.product.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">
                  Total:{" "}
                  <span className="font-bold text-black">
                    ₹{order.totalamount}
                  </span>
                </p>

                <button className="text-blue-500 hover:underline text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}
