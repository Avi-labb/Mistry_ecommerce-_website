import React, {  useState } from "react";
import { Menu, X, ShoppingCart, ShieldUser, Handbag, ArrowRightToLine, User, Play, PlayIcon, User2Icon, UserCheck2Icon, CheckCircle, ArrowBigRightDashIcon } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../api/axios";


const Navbar = () => {

  const navigate = useNavigate()

  const [menu, setMenu] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [name, setname] = useState('')
  const [cartCount, setcartCount] = useState(0)
  const [admin, Setadmin] = useState("")
  const [image, setimage] = useState()
  const [profile, setprofile] = useState(false)

  const getUser = async () => {
    try {

      const res = await api.get("/api/details")

      setname(res.data.user)
      setIsLogin(true)
    } catch (error) {
      setIsLogin(false)
      setname("")

    }
  }
  const AdminLogin = async () => {
    try {
      const res = await api.get("/admin/getadmin")

      setimage(res.data.admin.avatar);
      setIsLogin(true)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {

    const CartItem = async () => {
      try {
        const response = await api.get("/cart/show-cart")
        setcartCount(response.data.cart?.items?.length);
        Setadmin(response.data.role)

        if (response.data.role === "user") {
          getUser()
        } else if (response.data.role === "admin") {
          AdminLogin()
        }
      } catch (error) {
        console.log(error)
      }
    }
    CartItem();

    window.addEventListener("cartUpdated", CartItem)
    return () => {
      window.addEventListener("cartUpdated", CartItem)
    }
  }, [])

  const AdminLogout = async () => {
    try {
      const res = await api.get("/admin/logout",{})
      setIsLogin(false)
      Setadmin(false)
      navigate('/')
    } catch (error) {
      console.log(error.response.data.message || "Logout Failed");

    }
  }
  const Logout = async () => {
    try {
      const res = await api.get(
        "/api/logout");
      setIsLogin(false)
      setname("")
      
      navigate('/')
      
    } catch (error) {
      console.log(
        error.response?.data?.message || "Logout failed"
      );

    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-licorice backdrop-blur-xl text-white shadow-2xl">
      <div className="max-w-8xl mx-auto px-6 sm:px-12 ">

        <div className="flex justify-between items-center h-16">
          <Link href='/' className="text-md sm:text-xl font-bold cursor-pointer">
            ꩇׁׅ݊ꪱׁׅ꯱ׁׅ֒tׁׅꭈׁׅᨮ꫶ׁׅ֮

          </Link>

          <ul className="hidden md:flex items-center gap-8 font-bold text-[16px] -mr-10" >
            <NavLink to='/' className={({ isActive }) => isActive
              ? "text-butterscotch border-b-2 border-white hover:text-butterscotch  cursor-pointer"
              : "hover:text-butterscotch cursor-pointer"}>Home</NavLink>

            <div className="relative flex  items-center">
              <NavLink to='/shop' className={({ isActive }) => isActive
                ? "text-butterscotch border-b-2 border-white hover:text-butterscotch cursor-pointer"
                : "hover:text-butterscotch cursor-pointer"}>Shop</NavLink>
              <PlayIcon size={12} /></div>

            <NavLink to='/info' className={({ isActive }) => isActive
              ? "text-butterscotch border-b-2 border-white hover:text-butterscotch  cursor-pointer"
              : "hover:text-butterscotch cursor-pointer"}>Info</NavLink>

          </ul>


          <div className="flex  items-center  gap-4">

            {isLogin ?
              (admin === "user" ? (
                <div className="flex items-center gap-4">
                  <div
                    onMouseEnter={() => setprofile(true)}

                    onMouseLeave={() => setprofile(false)}
                    className="hidden sm:flex  text-[12px]  font-semibold tracking-wider">{name.fullname}

                    {profile && (<div className="absolute right-15 border bg-white/20 font-semibold text-black border-black mt-5 px-6 py-2">
                      <div className="flex items-center justify-center gap-2">
                        <User2Icon />
                        <div className="p-2">
                          <h1 className="text-[13px]">Hello User</h1>
                          <h1 className="text-md">+91{name.phoneNumber}</h1></div>
                      </div>
                      <hr />
                      <Link to="/view/order"> <div className="flex items-center p-2 gap-2">
                        <Handbag size={15} />
                        <h1 className="text-[14px]">My Orders</h1>
                      </div></Link>
                      <hr />
                      <h1 className="p-2 text-[14px]">Delete Account</h1>
                      <hr />
                      <div
                        onClick={Logout}
                        className="flex items-center p-2 cursor-pointer gap-2">
                        <ArrowRightToLine />
                        <h1 className="text-[14px]">Logout</h1>
                      </div>
                    </div>)}
                  </div>
                  <Link to='/cart'><button className="relative">
                    <ShoppingCart className="hidden sm:flex  hover:text-butterscotch cursor-pointer" />
                    <ShoppingCart size={20} className="flex -mr-1 mb-1 sm:hidden  hover:text-butterscotch cursor-pointer" />
                    <span className="absolute -top-2 -right-3 sm:-right-2 text-xs bg-red-500 rounded-full px-1">{cartCount}</span>
                  </button></Link>
                </div>
              ) : (
                <div 
                        onMouseEnter={() => setprofile(true)}
                        onMouseLeave={() => setprofile(false)}
                className=" p-2 flex items-center justify-center gap-2 ">
                  <Link to="/profile">
                    <div
                    className="h-10 w-10 bg-transparent border-2 rounded-full">
                      <img
                        className="rounded-full"
                        src={image} alt="Profile pic" />
                  {profile && (<div className=" absolute border bg-black/50 px-8 py-2 mt-1 -ml-32 ">

                    <div className="flex items-center justify-center p-2"><UserCheck2Icon size={25} /></div>
                    <hr />
                    <div className="flex justify-center cursor-pointer items-center gap-2 p-2">

                      <CheckCircle size={15} />
                      <Link to="/admin/status"> <h1 className="whitespace-nowrap">Check Status</h1></Link>
                    </div>
                    <hr />
                    <button onClick={AdminLogout} className=" flex itmes-center gap-2 text-[16px] p-2 cursor-pointer   ">

                      <ArrowBigRightDashIcon />
                      Logout</button>
                  </div>)}</div></Link>
                </div>

              )

              ) : (

                <>
                  <Link to='/admin/login' className="hover:text-butterscotch flex flex-col items-center justify-center cursor-pointer">
                    <ShieldUser />
                    <h1 className="text-[10px] font-semibold">ADMIN</h1>
                  </Link>

                  <Link to='/login' className="hover:text-butterscotch flex flex-col items-center justify-center cursor-pointer">
                    <User size={25} />
                    <h1 className="text-[10px] font-semibold tracking-widest">USER</h1>
                  </Link>
                </>

              )}

            <div className="md:hidden ">

              <button onClick={() => setMenu(!menu)}>
                {menu ? <X size={28} /> : <Menu size={20} className="cursor-pointer" />}
              </button>

            </div>

          </div>
        </div>
      </div>



      {menu && (

        <div className={`fixed  md:hidden top-0 right-0 bg-licorice text-white w-65 h-screen
        transform transition-transform duration-300
        ${menu ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mt-20 p-4">
            <div
              onClick={() => setMenu(!menu)}
              className='absolute cursor-pointer top-5 right-7 sm:right-11'>
              <X size={30} />
            </div>
            <p className="cursor-pointer font-bold hover:text-butterscotch ">Home</p>
            <div className='py-3'>
              <hr />
            </div>

            <p
              className="flex  items-center gap-1 hover:text-butterscotch cursor-pointer font-bold">Shop<Play size={11} strokeWidth={2} /></p>
            <div className='py-3'>
              <hr />
            </div>

            <p className="cursor-pointer font-bold hover:text-butterscotch ">Blog</p>
            <div className='py-3'>
              <hr />
            </div>
            <Link to='info' className="cursor-pointer font-bold hover:text-butterscotch ">Info</Link>
            <div className='py-3'>
              <hr />
            </div>
          </div>
        </div>

      )}

    </nav>
  )
}

export default Navbar