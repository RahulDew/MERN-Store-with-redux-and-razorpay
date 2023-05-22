import React from "react";
import Login from "../components/Login";
import Store from "../components/Store";

import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <div className="bg-slate-900">
        {isLoggedIn ? <Store /> : <Login />}
      </div>
    </>
  );
};

export default Home;
