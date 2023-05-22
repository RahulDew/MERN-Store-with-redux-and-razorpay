import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { itemsList: [], showCart: false, totalQuantity: 0, allTotalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const isItemExisting = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (isItemExisting) {
        isItemExisting.quantity++;
        isItemExisting.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          name: newItem.name,
          totalPrice: newItem.price,
          quantity: 1,
          price: newItem.price,
        });
      }
      state.totalQuantity++;
      state.allTotalPrice += newItem.price;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.itemsList.find(
        (item) => item.id === action.payload
      );
      // you can check the existingItem by below line
      // console.log(JSON.stringify(existingItem));

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      } else {
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== action.payload
        );
      }
      state.totalQuantity--;
      state.allTotalPrice -= existingItem.price;
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
