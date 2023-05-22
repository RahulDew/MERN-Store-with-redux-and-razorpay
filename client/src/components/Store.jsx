import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../reducers/authSlice";
import { cartActions } from "../reducers/cartSlice";
import Card from "./Card";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Lenovo Laptop skin",
    price: 950,
    imageSrc:
      "https://images.unsplash.com/photo-1588620353536-ded12e518f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    name: "Macbook Air M2 skin",
    price: 1100,
    imageSrc:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
  },
  {
    id: 3,
    name: "Dell Inspiron skin",
    price: 900,
    imageSrc:
      "https://images.unsplash.com/photo-1532603162520-4dd33af198f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    name: "Asus ROG Zephyrus Duo skin",
    price: 1000,
    imageSrc:
      "https://images.unsplash.com/photo-1630794180018-433d915c34ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
  },
];

const Store = () => {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const allTotalPrice = useSelector((state) => state.cart.allTotalPrice);

  const checkoutHandler = async (totalAmount) => {
    try {
      //getting API key from backend
      const keyResponse = await fetch("http://localhost:8080/key");
      const { key } = await keyResponse.json();

      // sending amount and getting order from razorpay
      const response = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const order = await response.json();
      console.log("order data: ", order);

      var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Rahul",
        description: "Cool Buy test transection",
        image:
          "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response) => {
          const data = {
            // razorpayorderCreationId: order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await fetch(
            "http://localhost:8080/api/paymentVarification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: data }),
            }
          );
          const resultData = await result.json();
          console.log(resultData);
          if (resultData.status === 200) {
            Navigate(`/paymentSuccess?reference=${data.razorpayPaymentId}`);
          }
        },
        prefill: {
          name: "Vigyan Kumar",
          email: "vigyan.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#161823",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen">
        <div className="bg-orange-300 flex justify-between items-center px-5 py-2">
          <div className="font-bold text-2xl">Cool Buy</div>
          <div className="flex gap-5">
            <button
              onClick={() => dispatch(cartActions.setShowCart())}
              className="p-3 px-5 bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition-all ms-1 rounded-xl font-semibold text-lg cursor-pointer"
            >
              Cart: {totalQuantity}
            </button>
            <button
              onClick={() => {
                dispatch(authActions.logOut());
              }}
              className="p-3 bg-slate-900 text-white hover:bg-white hover:text-slate-900 transition-all ms-1 rounded-xl font-semibold text-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        <h2 className="font-bold text-3xl text-white m-5">Products: </h2>
        <div className="bg-slate-900 flex gap-2">
          <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-11 lg:max-w-7xl lg:px-8">
            <div className="grid justify-center items-center grid-cols-1 gap-x-14 lg:gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {showCart && <Cart products={products} totalQuantity={totalQuantity} />}

        <div className="flex items-end flex-col mx-10 gap-2 my-11">
          <h2 className="text-white font-semibold text-xl mr-8">
            Total: ₹{allTotalPrice}
          </h2>
          <div
            onClick={() => checkoutHandler(allTotalPrice)}
            className="bg-orange-300 hover:bg-orange-400 cursor-pointer w-36 px-5 py-2 font-semibold text-lg rounded-md"
          >
            Place Order
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
