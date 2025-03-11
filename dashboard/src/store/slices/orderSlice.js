import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const orderSlice = createSlice({
  name:"order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
    message: null,
  },
  reducers:{
    getAllOrderRequest(state, action) {
      state.orders = [];
      state.error = null;
      state.loading = true;
    },
    getAllOrderSuccess(state, action) {
      state.orders = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllOrderFailed(state, action) {
      state.orders = state.orders;
      state.error = action.payload;
      state.loading = false;
    },

  placeOrderRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
  },
  placeOrderSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
  },
  placeOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
  },

  deleteOrderRequest(state, action) {
    state.loading = true;
    state.error = null;
    state.message = null;
  },
  deleteOrderSuccess(state, action) {
    state.error = null;
    state.loading = false;
    state.message = action.payload;
  },
  deleteOrderFailed(state, action) {
    state.error = action.payload;
    state.loading = false;
    state.message = null;
  },

  updateOrderRequest(state, action) {
    state.loading = true;
    state.error = null;
    state.message = null;
  },
  updateOrderSuccess(state, action) {
    state.loading = false;
    state.message = action.payload;
    state.error = null;
  },
  updateOrderFailed(state, action) {
    state.error = action.payload;
    state.loading = false;
    state.message = null;
  },

  resetOrderSlice(state, action) {
    state.error = null;
    state.orders = state.orders;
    state.message = null;
    state.loading = false;
  },
  clearAllErrors(state, action) {
    state.error = null;
    state = state.orders;
  },

  }
})

export const getAllOrder = () => async (dispatch) => {
  dispatch(orderSlice.actions.getAllOrderRequest());
  try {
    const response = await axios.get(
      "https://coffeeshopbackend.onrender.com/api/orders/get",
      { withCredentials: true }
    );
    dispatch(
      orderSlice.actions.getAllOrderSuccess(response?.data?.orders)
    );
    dispatch(orderSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      orderSlice.actions.getAllOrderFailed(error?.response?.data?.message)
    );
  }
};

export const PlaceOrder = (data) => async (dispatch) => {
  dispatch(orderSlice.actions.placeOrderRequest());
  try {
    const response = await axios.post(
      "https://coffeeshopbackend.onrender.com/api/orders/placeorder",
      data,
      {
        withCredentials: true,
        
      }
    );
    dispatch(orderSlice.actions.placeOrderSuccess(response.data.message));
    dispatch(orderSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      orderSlice.actions.placeOrderFailed(error.response.data.message)
    );
  }
};

export const deletePlaceOrder = (id) => async (dispatch) => {
  dispatch(orderSlice.actions.deleteOrderRequest());
  try {
    const response = await axios.delete(
      `https://coffeeshopbackend.onrender.com/api/orders/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(orderSlice.actions.deleteOrderSuccess(response.data.message));
    dispatch(orderSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      orderSlice.actions.deleteOrderFailed(error.response.data.message)
    );
  }
};

export const updatePlaceOrder = (id, newData) => async (dispatch) => {
  dispatch(orderSlice.actions.updateOrderRequest());
  try {
    const response = await axios.put(
      `https://coffeeshopbackend.onrender.com/api/orders/update/${id}`,
      newData,
      {
        withCredentials: true,
        
      }
    );
    dispatch(orderSlice.actions.updateOrderSuccess(response.data.message));
    dispatch(orderSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      orderSlice.actions.updateOrderFailed(error.response.data.message)
    );
  }
};
export const resetProjectSlice = () => (dispatch) => {
  dispatch(orderSlice.actions.resetProjectSlice());
};

export const clearAllPlaceOrder = () => (dispatch) => {
  dispatch(orderSlice.actions.clearAllErrors());
};

export default orderSlice.reducer;