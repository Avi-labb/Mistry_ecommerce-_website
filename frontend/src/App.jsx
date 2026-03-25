import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import ForgotPassword from "./pages/Login/Forgetpassword";
import ResetPassword from "./pages/Login/Resetpassword";
import AdminLogin from "./pages/Login/AdminLogin";
import AdminRegister from "./pages/Login/AdminRegister";
import Shop from "./pages/Shop";
import AdminCreateProduct from "./pages/CreateProduct";
import MistryInfoPage from './pages/Info'
import Productdetail from "./pages/Productdetail";
import Cart from "./pages/cart";
import AdminProfile from "./pages/Login/AdminProfile";
import ChangePassword from "./pages/Login/Adminpasswordchange";
import AdminDashboard from "./pages/AminStatus";
import { ViewOrder } from "./components/ViewOrder";

const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path:"/shop", element:<Shop />},
      { path: '/product/:id',element:<Productdetail />},
      { path: '/info', element:<MistryInfoPage />},


    ]
  },

  { path: "/admin/register", element: <AdminRegister /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/create-product", element:<AdminCreateProduct />},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  { path: "/password/forget", element: <ForgotPassword /> },
  { path: "/password/reset", element: <ResetPassword /> },
  { path: '/profile',element:<AdminProfile />},
  { path: '/change-password/:token',element:<ChangePassword /> },
  { path: '/cart', element:<Cart />},
  { path: '/view/order',element:<ViewOrder />},
  { path: '/admin/status', element:<AdminDashboard />}

]);

export default function App() {
  return <RouterProvider router={router} />;
}