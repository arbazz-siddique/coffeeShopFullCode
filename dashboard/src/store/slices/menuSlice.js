import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const menuSlice = createSlice({
    name:"menu",
    initialState:{
        loading:false,
        menuItems:[],
        error: null,
        message: null,
    },
    reducers:{
        getAllMenuRequest(state,action) {
            state.menuItems = [];
            state.error = null;
            state.loading = true;
          },
          getAllMenuSuccess(state, action) {
            state.menuItems = action.payload;
            state.error = null;
            state.loading = false;
          },
          getAllMenuFailed(state, action) {
            state.menuItems = state.menuItems;
            state.error = action.payload;
            state.loading = false;
          },
    
          addNewMenuRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          addNewMenuSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
          },
          addNewMenuFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
    
    
          deleteMenuRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          deleteMenuSuccess(state, action) {
            state.error = null;
            state.loading = false;
            state.message = action.payload;
          },
          deleteMenuFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
    
          updateMenuRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
          },
          updateMenuSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
          },
          updateMenuFailed(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.message = null;
          },
    
          resetMenuSlice(state, action) {
            state.error = null;
            state.menuItems = state.menuItems;
            state.message = null;
            state.loading = false;
          },
          clearAllErrors(state, action) {
            state.error = null;
            state = state.menuItems;
          },
    }
   
})


export const getAllMenu = () => async (dispatch) => {
    dispatch(menuSlice.actions.getAllMenuRequest());
    try {
      const response = await axios.get(
        "https://coffeeshopbackend.onrender.com/api/menu/get",
        { withCredentials: true }
      );
      dispatch(
        menuSlice.actions.getAllMenuSuccess(response.data.menuItems)
      );
      dispatch(menuSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        menuSlice.actions.getAllMenuFailed(error?.response?.data?.message)
      );
    }
  };


  export const addNewMenu = (data) => async (dispatch) => {
    dispatch(menuSlice.actions.addNewMenuRequest());
    try {
      const response = await axios.post(
        "https://coffeeshopbackend.onrender.com/api/menu/add",
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(menuSlice.actions.addNewMenuSuccess(response?.data?.message));
      dispatch(menuSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        menuSlice.actions.addNewMenuFailed(error?.response?.data?.message)
      );
    }
  };


  export const deleteMenu = (id) => async (dispatch) => {
    dispatch(menuSlice.actions.deleteMenuRequest());
    try {
      const response = await axios.delete(
        `https://coffeeshopbackend.onrender.com/api/menu/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(menuSlice.actions.deleteMenuSuccess(response.data.message));
      dispatch(menuSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        menuSlice.actions.deleteMenuFailed(error.response.data.message)
      );
    }
  };

  export const updateMenu = ({ id, newData }) => async (dispatch) => {
    dispatch(menuSlice.actions.updateMenuRequest());
    try {
      const response = await axios.put(
        `https://coffeeshopbackend.onrender.com/api/menu/update/${id}`,
        newData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(menuSlice.actions.updateMenuSuccess(response.data.message));
      dispatch(menuSlice.actions.clearAllErrors());
    } catch (error) {
      console.log(error);
      dispatch(
        menuSlice.actions.updateMenuFailed(error.response.data.message)
      );
    }
  };

  export const resetMenuSlice = () => (dispatch) => {
    dispatch(menuSlice.actions.resetMenuSlice());
  };
  
  export const clearAllMenuErrors = () => (dispatch) => {
    dispatch(menuSlice.actions.clearAllErrors());
  };
  

export default menuSlice.reducer;