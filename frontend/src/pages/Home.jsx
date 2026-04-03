import React, { isValidElement, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router'
import {ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
const Home = () => {
  const navigate=useNavigate()
const reviews = [
  
  {
    img: "/Images/avatar-2.png",
    name: "Hannah K.",
    text: "Amazing quality and elegant design. Perfect for every occasion.",
  },
  {
    img:"/Images/avatar-4.jpeg",
    name:"ashleey",
    text:"This scarf instantly became my go-to for chilly mornings. Stylish and warm!"
  },
  {
    img:"/Images/avatar-3.png",
    name:"Sam",
    text:"Amazing quality and elegant design. Perfect for every occasion."
  }
];
  const images = [
    "/Images/slide-1.jpg",
    "/Images/slide-2.jpg",
    "/Images/slide-3.jpg",
    "/Images/slide-4.jpg",
    "/Images/slide-5.jpg",
    "/Images/slide-6.jpg",
    "/Images/slide-7.jpg",
  ];

  return (
    <div>
      <div className="relative w-full bg-gradient-to-r from-pink-100 via-yellow-100 to-purple-100 grid grid-cols-1 md:grid-cols-2 items-center h-[800px]">

        <div className="relative z-10 flex flex-col justify-center  h-[800px] px-6 md:px-16 text-white md:text-black">
          <div className="px-8 md:px-35 space-y-6 ">
            <p className="uppercase tracking-widest animate-fade-in text-2xl font-semibold opacity-80">
              🆆🅴🅻🅲🅾🅼🅴 🆃🅾 <span className="text-4xl">🅼🅸🆂🆃🆁🆈</span>
            </p>

            <h1 className="text-4xl text-amber-500/80 sm:text-amber-800/80 md:text-6xl font-bold whitespace-nowrap leading-tight">
              Handmade Fashion <br /> & Vintage Pieces
            </h1>

            <p className="text-md sm:text-lg font-semibold opacity-90 whitespace-nowrap">
              Discover premium clothing, accessories, and lifestyle<br /> products
              crafted with timeless design and modern trends.
            </p>

            <div className="flex gap-4">
              <button 
              onClick={()=>{
                navigate('/shop')
              }}
              className="px-7 py-3 bg-yellow-400 text-black rounded-md font-semibold hover:scale-105 transition">
                Shop Now
              </button>

              <button className="px-7 py-3 text-white font-semibold bg-licorice  rounded-md  hover:scale-105">
                Explore
              </button>
            </div>

            <div className="pt-6">
              <p className="text-sm opacity-70 mb-3">Trusted by</p>

              <div className="flex gap-8 opacity-70 font-semibold">
                <span>IPSUM</span>
                <span>LOGOCO</span>
                <span>ICONIUM</span>
                <span>BRANDIX</span>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute md:static ">
          <img
            src="/Images/hero-banner.jpg"
            alt="shopping"
            className="ml-0 sm:ml-50 w-[550px] h-[800px] object-cover "
          />
          <div className="md:hidden absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
      </div>
      <div className="py-16 bg-pink-50 px-8 md:px-20  ">

        <h2 className="text-3xl font-serif tracking-wide font-bold mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          <div
            className=" rounded-2xl w-full h-50 sm:h-80 text-center hover:shadow-xl  hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <h1
              className="p-5  text-white font-bold text-xl absolute "
            >Clothing</h1>
            <img src="/Images/clothes.jpg"
              className=" rounded-2xl h-full w-full  object-cover"
              alt="" />
            <h3 className="absolute font-semibold text-lg">Clothing</h3>
          </div>

          <div
            className=" rounded-2xl w-full h-50 sm:h-80  text-center hover:shadow-xl  hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <h1
              className="p-5 text-white font-bold text-xl absolute "
            >Watches</h1>
            <img src="/Images/watches.jpg"
              className=" rounded-2xl object-cover w-full h-full "
              alt="" />
            <h3 className="absolute font-semibold text-lg">Watches</h3>
          </div>

          <div
            className=" rounded-2xl h-50 sm:h-80  text-center hover:shadow-xl  hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <h1
              className="p-5  text-white font-bold text-xl absolute "
            >Electronics</h1>
            <img src="/Images/electronic.jpg"
              className=" rounded-2xl h-full w-full  object-cover"
              alt="" />
            <h3 className="absolute font-semibold text-lg">Electronics</h3>
          </div><div
            className=" rounded-2xl h-50 sm:h-80  text-center hover:shadow-xl  hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <h1
              className="p-5 text-yellow-300  font-bold text-xl absolute "
            >Accessories</h1>
            <img src="/Images/acc.webp"
              className=" rounded-2xl h-full w-full object-cover"
              alt="" />
            <h3 className="absolute font-semibold text-lg">Accessories</h3>
          </div>

          <div
            className=" rounded-2xl h-50 sm:h-80  text-center hover:shadow-xl  hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <h1
              className="p-5   font-bold text-xl absolute "
            >Bags</h1>
            <img src="/Images/bags.jpg"
              className=" rounded-2xl h-full w-full object-cover"
              alt="" />
            <h3 className="absolute font-semibold text-lg">Bags</h3>
          </div>

        </div>
        
        <div className="w-full  mt-20 px-0 sm:px-6 absolute-hidden ">

          <div className="flex justify-end items-center mb-3  ml-5 gap-3">
            <div className="border border-black/30 p-1">
              <ArrowLeftToLine  className="text-zinc-600"/>
            </div>
            <div className="border border-black/30 p-1"><ArrowRightToLine  className="text-zinc-600" />
            </div>
            
          </div>
          <div className="block sm:flex items-center gap-25">
            <div>
              <h2 className="text-xl sm:text-4xl  font-bold">Trending Collections</h2>
              <p className="hidden sm:flex text-gray-500 text-md">
                Handmade & Vintage picks curated for you
              </p>
              <button className="text-md text-pink-600 font-semibold hover:underline">
              View All →
            </button>
            </div>
          <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4 
    [&::-webkit-scrollbar]:hidden">
          <div className="animate-continue flex ">
            {images.map((img, index) => (
              <div
                key={index}
                className="min-w-[220px] bg-white rounded-xl shadow-md p-3 hover:shadow-xl transition duration-300 group"
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={img}
                    className="w-full h-[200px] object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <h3 className="font-semibold text-sm">
                    Vintage Handmade Item
                  </h3>

                  <p className="text-gray-500 text-xs">
                    Limited Edition Collection
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">₹1299</span>
                    <span className="text-gray-400 line-through text-sm">₹1999</span>
                    <span className="text-green-600 text-xs font-semibold">
                      35% OFF
                    </span>
                  </div>
              
                  <button className="w-full mt-2 bg-black text-white text-sm py-1.5 rounded-md hover:bg-gray-800 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
            </div>
        </div>
          </div>
        </div>

      </div>
      <section className="grid md:grid-cols-3 gap-6 p-10 bg-gray-50">
        {["Handmade Craft", "Vintage Collection", "Premium Quality"].map((item, i) => (
          <div key={i} className="p-6 shadow-lg rounded-2xl hover:scale-105 text-center bg-white transition-all duration-500">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="text-gray-500 mt-2">Unique and carefully curated products</p>
          </div>
        ))}
      </section>
      
      <section className="w-full flex flex-col items-center justify-center  h-150">
        
        <div>
          <img src="/Images/cta-bg.png" 
          className="object-cover w-500 bg-amber-300   h-150 "
          alt="" />
        </div>
      
      <div className="bg-cafe absolute ml-5 sm:ml-10  rounded-xl mt-10 py-5 sm:py-3 px-6 text-white ">
      <h2 className="text-3xl font-semibold mb-2 sm:mb-10 text-center">
        Customer Reviews

      </h2>
      <div className="block sm:flex  space-y-6 sm:space-x-2">

        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-90 sm:w-110 bg-pink-50 hover:scale-103 transition:scale duration-500 text-gray-800 rounded-xl shadow-lg p-4"
          >
           <div className="text-xs sm:text-lg text-yellow-500 mb-2">
              ⭐⭐⭐⭐⭐
            </div>
            <div className="flex gap-4">
              <img
                src={review.img}
                className="h-10 sm:w-20 h-10 sm:h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xs sm:text-md font-semibold">LOVE IT!</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {review.text}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-0 sm:mt-4">
              
              <p className="text-sm font-medium">{review.name}</p>
            </div>

          </div>
        ))}
      </div>

      <div className="hidden sm:flex justify-center mt-6 gap-4">
        <button className="bg-white text-black px-3 py-1 rounded shadow hover:scale-105 transition">
          ◀
        </button>
        <button className="bg-white text-black px-3 py-1 rounded shadow hover:scale-105 transition">
          ▶
        </button>
      </div>

    </div> 
   </section>
   
      <section className="bg-[#f5eadc] text-gray-800 px-6 py-10 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 items-start">
        <div>
          <h1 className="text-xl font-bold tracking-wide">
            MISTRY
          </h1>
          <p className="text-sm mt-2 text-gray-600">
            Handmade Fashion & Vintage Pieces
          </p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Get in Touch</h2>
          <p className="text-sm text-gray-600">
            We'd love to hear from you.
          </p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Mailing Address</h2>
          <p className="text-sm text-gray-600">
            123 Main street road near belapur St.<br />
            Solapur, India
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <p className="text-sm text-gray-600">
            📧 mistryshop@gmail.com
          </p>
          <p className="text-sm text-gray-600 mt-1">
            📞 +91 98765 43210
          </p>
        </div>

      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-600">
        © 2026 Mistry. All rights reserved.
      </div>
    </section>
    </div>
  );
};

export default Home