import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../reducers/cartSlice";

const Cart = ({ totalQuantity }) => {
  const dispatch = useDispatch();

  const cartItemsList = useSelector((state) => state.cart.itemsList);

  return (
    <>
      <h2 className="font-bold text-3xl text-white mx-5">Cart items: </h2>

      {totalQuantity ? (
        cartItemsList.map((item) => (
          <div
            key={item.id}
            className="bg-orange-300 flex justify-between rounded-xl mx-10 my-5 items-center px-5 py-2"
          >
            <div className="font-semibold text-xl">
              <div className="w-60">{item.name}</div>
              <div>₹{item.price}</div>
            </div>
            <div className="font-semibold text-lg">x{item.quantity}</div>
            <div className="font-semibold text-lg">
              Total: {item.totalPrice}
            </div>
            <div className="flex gap-8">
              <button
                onClick={() => dispatch(cartActions.removeFromCart(item.id))}
                className="text-center w-7 h-8 bg-slate-900 text-white hover:bg-white hover:text-slate-900 rounded-md font-semibold text-lg cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() =>
                  dispatch(
                    cartActions.addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                    })
                  )
                }
                className="text-center w-7 h-8 bg-slate-900 text-white hover:bg-white hover:text-slate-900 rounded-md font-semibold text-lg cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-white text-center font-bold text-2xl my-5">
          Your Cart is Empty!
        </h2>
      )}
    </>
  );
};

export default Cart;
