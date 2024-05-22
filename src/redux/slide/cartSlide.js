import { createSlice, createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartTotal: 0,
  orderby: "",
};

export const cartSlide = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const cartItem = action.payload.product;
      const alreadyExists = state?.products?.find(
        (item) => item?._id === cartItem._id
      );
      if (alreadyExists) {
        alreadyExists.amount += cartItem?.amount;
      } else {
        state.products.push(cartItem);
        state.cartTotal += cartItem.price * cartItem?.amount;
        state.orderby = action.payload.user.user;
      }
    },
    increaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?._id === idProduct);
      itemCart.amount++;
      state.cartTotal += itemCart.price;
    },
    decreaseAmount: (state, action) => {
      const idProduct = action.payload;
      const itemCart = state?.products?.find((item) => item?._id === idProduct);
      itemCart.amount--;
      state.cartTotal -= itemCart.price;
    },

    removeCartProduct: (state, action) => {
      const { idProduct } = action.payload;

      // Tìm sản phẩm cần xóa
      const productIndex = state.products.findIndex(
        (item) => item._id === idProduct
      );

      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        // Giảm số lượng và cập nhật tổng giá
        state.cartTotal -= removedProduct.price * removedProduct.amount;
        // Loại bỏ sản phẩm từ danh sách
        state.products.splice(productIndex, 1);
      }
    },
    setCartProduct: (state, action) => {
      console.log("action.payload.products: ", action.payload?.products);
      state.products = action.payload?.products;
      state.cartTotal = action.payload?.cartTotal;
      state.orderby = action.payload?.orderby;
    },
    resetState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  addtoCart,
  increaseAmount,
  decreaseAmount,
  removeCartProduct,
  setCartProduct,
  resetState,
} = cartSlide.actions;

export default cartSlide.reducer;
