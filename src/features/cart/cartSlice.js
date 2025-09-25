import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // { [id]: {id, name, price, image, qty} }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const p = action.payload;
      if (!state.items[p.id]) {
        state.items[p.id] = { ...p, qty: 1 };
      }
    },
    increment: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
    },
    decrement: (state, action) => {
      const id = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty -= 1;
      if (state.items[id].qty <= 0) delete state.items[id];
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, increment, decrement, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectItems = (state) => Object.values(state.cart.items);
export const selectTotalCount = createSelector([selectItems], (arr) =>
  arr.reduce((n, it) => n + it.qty, 0)
);
export const selectTotalCost = createSelector([selectItems], (arr) =>
  arr.reduce((sum, it) => sum + it.qty * it.price, 0)
);
export const selectHasItem = (id) => (state) => Boolean(state.cart.items[id]);
