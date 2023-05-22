import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../reducers/cartSlice";


const Card = ({ product }) => {
  const { id, name, price, imageSrc } = product;
  
  const dispatch = useDispatch();
  

  const handleClick = () => {
    dispatch(cartActions.addToCart({
      id,
      name,
      price,
    }))
  };

  return (
    <a className="group">
      <div className="aspect-h-1 aspect-w-1 w-56 overflow-hidden rounded-lg bg-slate-200 ">
        <img
          src={imageSrc}
          className="h-56 w-56 object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div>
        <h3 className="mt-4 text-sm text-gray-200">{name}</h3>
        <p className="mt-1 text-lg font-medium text-white">₹{price}</p>
        <button
          onClick={handleClick}
          className=" my-2 bg-orange-300 hover:bg-white font-semibold text-gray-900 p-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </a>
  );
};

export default Card;
