import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function OrderSuccess() {
  const navigate = useNavigate();
    const [orders, setorders] = useState("")
    useEffect(() => {
  let timer;

  const loaddata = async () => {
    try {
      const response = await api.get("/order/get");

      setorders(response.data.orders._id);

      timer = setTimeout(() => {
        navigate('/');
      }, 4000);

    } catch (error) {
      console.log(error);
    }
  };

  loaddata();

  return () => clearTimeout(timer)
}, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">

        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold text-gray-800">{orders}</p>

          <p className="text-sm text-gray-500 mt-2">Estimated Delivery</p>
          <p className="font-semibold text-gray-800">3-5 Days</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;