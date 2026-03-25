import React, { useEffect, useState } from "react";
import { ShoppingBag, Truck, ShieldCheck, Sparkles, Users, Globe,  } from "lucide-react";
import { Link } from "react-router";
export default function MistryInfoPage() {

  const images = [
    "/Images/info3.jpeg",
    "/Images/info4.jpeg",
    "/Images/info6.jpg",
    "/Images/info7.jpg",
    "/Images/info9.jpg",
    "/Images/info10.jpg",
    "/Images/info11.jpg",
    "/Images/info12.jpg",
  ];

  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

        {images.map((img, index) => (
          <div key={index}  className="absolute w-full h-full object-cover">
            <img
            key={index}
            src={img}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100 " : "opacity-0" 
            }`}
          />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Mistry.store
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Mistry is a modern online shopping destination inspired by the
            convenience of large marketplaces like Flipkart and Meesho.
            Discover fashion, electronics, lifestyle products and daily
            essentials — all in one place.
          </p>

         <Link to="/shop"> <button className="bg-red-500 px-8 py-4 rounded-xl font-semibold hover:scale-95 transition">
            Start Shopping
          </button></Link>
        </div>
      </section>


      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <img
          src="https://i.pinimg.com/originals/a5/6f/c9/a56fc90a5ed23e3047aa9cc902750b54.gif"
          className="rounded-3xl shadow-xl"
        />

        <div>
          <h2 className="text-4xl font-bold mb-6">About Mistry</h2>

          <p className="text-gray-600 mb-4">
            Mistry.store is an innovative e-commerce platform designed to make
            online shopping simple and enjoyable. Our goal is to connect
            customers with high-quality products at affordable prices.
          </p>

          <p className="text-gray-600">
            Inspired by leading marketplaces, Mistry offers thousands of
            products across fashion, gadgets, home essentials, and lifestyle
            categories.
          </p>
        </div>

      </section>


      <section className="bg-white/50 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">

          Why Shop With Mistry?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <ShoppingBag size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Huge Product Range</h3>
            <p className="text-gray-500 text-sm mt-2">
              Thousands of products across fashion, electronics and daily
              essentials.
            </p>
          </div>

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <Truck size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-gray-500 text-sm mt-2">
              Reliable logistics ensures your products reach you quickly.
            </p>
          </div>

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <ShieldCheck size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Secure Payments</h3>
            <p className="text-gray-500 text-sm mt-2">
              Shop confidently with trusted and secure payment systems.
            </p>
          </div>

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <Sparkles size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Trending Products</h3>
            <p className="text-gray-500 text-sm mt-2">
              Discover popular and trending items every day.
            </p>
          </div>

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <Users size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Growing Community</h3>
            <p className="text-gray-500 text-sm mt-2">
              Thousands of customers trust Mistry for their daily shopping.
            </p>
          </div>

          <div className="text-center cursor-pointer p-6 rounded-2xl shadow hover:shadow-xl transition">
            <Globe size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-semibold text-lg">Global Products</h3>
            <p className="text-gray-500 text-sm mt-2">
              Explore products sourced from trusted suppliers worldwide.
            </p>
          </div>

        </div>
      </section>

      <section className="py-20 px-6 bg-gray-100">

        <h2 className="text-4xl font-bold text-center mb-16">
          Explore the Shopping Experience
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

          <img
            src="/Images/info8.jpg"
            className="rounded-2xl shadow-lg hover:scale-105 transition"
          />

          <img
            src="/Images/info14.jpg"
            className="rounded-2xl shadow-lg hover:scale-105 transition"
          />

          <img
            src="/Images/info1.jpeg"
            className="rounded-2xl shadow-lg hover:scale-105 transition"
          />

        </div>

      </section>

      <section className="py-24 text-center bg-black text-white">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Start Shopping With Mistry Today
        </h2>

        <p className="text-gray-300 mb-8">
          Discover amazing deals and enjoy a seamless shopping experience on
          Mistry.store.
        </p>

        <button className="bg-red-500 px-10 py-4 rounded-xl font-semibold hover:scale-95 transition">
          Explore Products
        </button>

      </section>


      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        © {new Date().getFullYear()} Mistry.store — Online Shopping Center
      </footer>


    </div>
  );
}
