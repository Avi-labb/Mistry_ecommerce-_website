import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Login/Register"));
const ForgotPassword = lazy(() => import("./pages/Login/Forgetpassword"));
const ResetPassword = lazy(() => import("./pages/Login/Resetpassword"));
const AdminLogin = lazy(() => import("./pages/Login/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/Login/AdminRegister"));
const Shop = lazy(() => import("./pages/Shop"));
const AdminCreateProduct = lazy(() => import("./pages/CreateProduct"));
const MistryInfoPage = lazy(() => import("./pages/Info"));
const Productdetail = lazy(() => import("./pages/Productdetail"));
const Cart = lazy(() => import("./pages/cart"));
const AdminProfile = lazy(() => import("./pages/Login/AdminProfile"));
const ChangePassword = lazy(() => import("./pages/Login/Adminpasswordchange"));
const AdminDashboard = lazy(() => import("./pages/AminStatus"));
const ViewOrder = lazy(() => import("./components/ViewOrder"));

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
  { path: '/admin/status', element:<AdminDashboard />},

]);

export default function App() {
  return (
    <Suspense fallback={<div className="felx justify-center items-center text-center mt-10">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}