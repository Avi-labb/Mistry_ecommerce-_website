import React, { useEffect, useState } from "react";
import AddressUI from "../components/Address";
import Paymentoption from "../components/Paymentoption";
import OrderSuccess from "../components/OrderSucess";
import { useLocation } from "react-router";
import api from "../api/axios";

const Cart = () => {

  const [cart, setCart] = useState([]);
  const [move, setmove] = useState(1)
  const location=useLocation()

  const loadCart = async () => {
    try {

      const res = await api.get(
        "/cart/show-cart",
      );

      setCart(res.data.cart.items);

    } catch (error) {
      console.log(error.response?.data?.message || "Cart error");
    }
  };

  useEffect(() => {
    loadCart();
    if(location.state?.move){
      setmove(location.state.move)
    }
  }, [location.state]);

  const removeItem = async (productId) => {
    try {

      await api.post(
        "/cart/remove-to-cart",
        { productId },
      );

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const increaseQty = async (productId, quantity) => {
    try {

      await api.post("/cart/update",
        { productId, quantity: quantity + 1 });

      loadCart();

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const decreaseQty = async (productId, quantity) => {
    try {

      await api.post(
        "/cart/update",
        { productId, quantity: quantity - 1 },
      );

      loadCart();

    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = cart.reduce(
    (acc, item) =>
      acc +
      ((item.product.price * item.product.discountPercent) / 100) *
      item.quantity,
    0
  );

  const total = subtotal - discount;


  const [addressId, setaddressId] = useState("")
  const [paymentoption, setpaymentoption] = useState("cod")

  const handlePlaceorder = async () => {
    try {
      const res = await api.post("/order/create",
        {
          addressId: addressId,
          paymentMethod: paymentoption
        },

      )
      loadCart()
      setmove(5)
    } catch (error) {

    }
  }


  const handlenext = () => {
    if (move === 4) {
      handlePlaceorder()
    } else {
      setmove((prev) => prev + 1)
    }
  }
  return (

    <div className="">
      <div className="flex bg-zinc-200 justify-between px-10 sm:px-55 py-4 mb">
        <div className="font-semibold text-2xl">ꩇׁׅ݊ꪱׁׅ꯱ׁׅ֒tׁׅꭈׁׅᨮ꫶ׁׅ֮</div>
        <div className="flex justify-center items-center">

          <div className="flex justify-center items-center">
            <div className={`h-5 w-5 rounded-full  flex  items-center justify-center ${move === 1 ? "text-blue-500 border border-blue-500" : "text-zinc-500 border border-zinc-400"}`}>1</div>
            <h1 className="absolute text-[10px] mt-10">Cart</h1>
          </div>
          <div className="w-20 h-[1px] bg-zinc-400 overflow-hidden">
            <div
              className={`h-full bg-blue-500 transition-all duration-1000 ease-in-out
                ${move === 2 ? "translate-x-0" : "-translate-x-full"}`}
            ></div>
          </div>

          <div className="flex justify-center items-center">
            <div className={`h-5 w-5 rounded-full flex  items-center justify-center ${move === 2 ? "text-blue-500 border border-blue-500" : "text-zinc-500 border border-zinc-400"}`}>2</div>
            <h1 className="absolute text-[10px] mt-10">Address</h1>
          </div>
          <div className="w-20 h-[1px] bg-zinc-400 overflow-hidden">
            <div
              className={`h-full bg-blue-500 transition-all duration-1000 ease-in-out
                ${move === 3 ? "translate-x-0" : "-translate-x-full"}`}
            ></div>
          </div>

          <div className="flex justify-center items-center">
            <div className={`h-5 w-5 rounded-full flex  items-center justify-center ${move === 3 ? "text-blue-500 border border-blue-500" : "text-zinc-500 border border-zinc-400"}`}>3</div>
            <h1 className="absolute text-[10px] mt-10">Payment</h1>
          </div>
          <div className="w-20 h-[1px] bg-zinc-400 overflow-hidden">
            <div
              className={`h-full bg-blue-500 transition-all duration-1000 ease-in-out
                ${move === 4 ? "translate-x-0" : "-translate-x-full"}`}
            ></div>
          </div>

          <div className="flex justify-center items-center">
            <div className={`h-5 w-5 rounded-full flex  items-center justify-center ${move === 4 ? "text-blue-500 border border-blue-500" : "text-zinc-500 border border-zinc-400"}`}>4</div>
            <h1 className="absolute text-[10px] mt-10 ">summary</h1>
          </div>

        </div>
      </div>
      <hr className="text-black/30 " />
      <div className="min-h-screen bg-zinc-100  p-8">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {move === 1 && (<div className="md:col-span-2 border border-black/30 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 && (
              <p className="text-gray-500">Your cart is empty</p>
            )}
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500">
                      ₹{item.product.price}
                    </p>
                  </div>
                </div>



                <div className="flex items-center gap-2">

                  <button
                    onClick={() => decreaseQty(item.product._id, item.quantity)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.product._id, item.quantity)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                </div>


                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>
          )}

          {move === 2 && (<div className="md:col-span-2 border border-black/10 bg-white p-6 rounded-xl shadow">
            <AddressUI setmove={setmove} setaddressId={setaddressId} />
          </div>)}

          {move === 3 && (<div className="md:col-span-2   p-6  ">
            <Paymentoption setpaymentoption={setpaymentoption} />
          </div>)}

          {move !== 5 && (<div className={`bg-white  ${move === 4 ? "w-[380px] sm:w-[780px]" : ""} p-6 rounded-xl shadow h-fit`}>

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount (%)</span>
              <span>-₹{discount}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>₹{ }</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            {move !== 2 && (
              <button
                onClick={handlenext}
                disabled={cart.length === 0} 
                className={`w-full mt-6 font-semibold text-white py-3 rounded-lg transition 
                  ${cart.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-gray-800"}
                      `}
              >
                {move !== 4 ? "Continue" : "Proceed to Pay"}
              </button>
            )}

          </div>)}
        </div>
        {move === 5 && <OrderSuccess />}
      </div>
    </div>
  );
};

export default Cart;