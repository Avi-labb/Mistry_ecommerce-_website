import { useState } from "react";

export default function Paymentoption({setpaymentoption}) {
  const [selected, setSelected] = useState("cod");

  const methods = [
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay when order arrives",
    },
    {
      id: "online",
      title: "Google Pay",
      subtitle: "Pay using UPI",
    },
    
    {
      id: "online",
      title: "Paytm",
      subtitle: "Wallet / UPI",
    },
    {
      id: "online",
      title: "Scan QR",
      subtitle: "Pay via any UPI app",
    },
  ];

  return (
    <div className="max-w-xl mx-auto p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">
        SELECT PAYMENT METHOD
      </h2>
      
      <div className="space-y-3">
        {methods.map((method,idx) => (
          <div
            key={idx}
            onClick={() => {
              setpaymentoption(method.id)
              setSelected(method.id)}}
            className={`cursor-pointer border rounded-lg p-4 flex items-center gap-4 transition
            ${
              selected === method.id
                ? "border-black shadow-sm"
                : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={selected === method.id}
              readOnly
            />

            <div>
              <p className="font-medium text-gray-800">
                {method.title}
              </p>
              <p className="text-sm text-gray-500">
                {method.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selected === "qr" && (
        <div className="mt-4 p-4 border rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-2">
            Scan this QR to pay
          </p>

          <div className="w-32 h-32 mx-auto bg-gray-200 flex items-center justify-center text-xs">
            QR CODE
          </div>
        </div>
      )}

      <button className="w-full mt-5 bg-pink-700 hover:bg-pink-800 text-white py-2 rounded-md">
        Proceed to Pay
      </button>
    </div>
  );
}