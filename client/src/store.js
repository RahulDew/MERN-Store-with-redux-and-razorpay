import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import cartSlice from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    //this key name will use when we acess through useSelector
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
