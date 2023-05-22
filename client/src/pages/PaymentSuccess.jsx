import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


const PaymentSuccess = () => {

  const searchparams = useSearchParams()[0];
  const referenceNum = searchparams.get("reference")

  return (
    <div className=" bg-slate-900 text-white h-screen w-full relative flex justify-center items-center flex-col gap-3">
      <div className="font-bold text-3xl ">Your Payment is successfull!!!</div>
      <div className="text-gray-300">Reference_No.: {referenceNum}</div>
      <Link to={"/"} className=" bg-orange-300 rounded-md p-2 text-gray-900 font-semibold hover:bg-orange-400">Back to Home</Link>
    </div>
  );
};

export default PaymentSuccess;
