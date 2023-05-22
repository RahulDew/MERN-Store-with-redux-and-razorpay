import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../reducers/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // the data is not going to be store anywhere of the user
    // so it's fake signin just for redireactin purpose
    dispatch(authActions.login());
  };

  return (
    <>
      <div className=" bg-slate-900 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
          Sign in to your account
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg leading-6 text-slate-200"
              >
                Email Id
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full text-xl px-2 rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg leading-6 text-slate-200"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full text-xl px-2  rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-300 px-3 py-2.5 text-lg font-semibold leading-6 text-slate-900 shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
