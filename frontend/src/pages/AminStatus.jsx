import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totaluser: 0,
    totalproduct: 0,
    totalorders: 0,
    revenue: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {        
        const res = await api.get("/admin/Status");
        console.log(res.data);
        
        setStats(res.data);
        
        setOrders(res.data.orders);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  const updatestatus=async()=>{
    try {
      const res=await api.put(`/admin/updatedStatus/${id}`,
      )
    } catch (error) {
      
    }
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: stats.totaluser },
          { title: "Total Products", value: stats.totalproduct },
          { title: "Total Orders", value: stats.totalorders },
          { title: "Revenue", value: `₹${stats.totalRevenue}` },
        ].map((item, index) => (
          <div key={index}  className="bg-white p-6 hover:scale-105 transition-all duration-300 rounded-2xl shadow">
            <h2 className="text-gray-500 text-sm">{item.title}</h2>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Order ID</th>
                <th className="p-2">User</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
             <tbody>
              {orders.map((order, i) => (
                <tr
                onClick={updatestatus}
                key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.user.fullname || "User"}</td>
                  <td className="p-2">₹{order.totalamount}</td>
                  <td className="p-2 text-green-600">{order.paymentStatus}</td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
        
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-black text-white px-4 py-2 rounded-lg">Add Product</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">View Orders</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Manage Users</button>
        </div>
      </div>

    </div>
  );
}