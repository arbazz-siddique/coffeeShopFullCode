import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    loading: false,
    reservations: [],
    error: null,
    message: null,
  },

  reducers:{
    getAllReservationRequest(state, action){
      state.reservations = [];
      state.error = null;
      state.loading = true;
    },
    getAllReservationSuccess(state,action){
        state.reservations = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllReservationFailed(state, action) {
        state.error = action.payload;
        state.loading = false;
        state.message= action.message;
      },
    
      makeReservationRequest(state) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      makeReservationSuccess(state, action) {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      },
    
      makeReservationFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = action.message;
      },

      deleteReservationRequest(state) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      deleteReservationSuccess(state, action) {
        state.loading = false;
        state.message = action.message;
        state.error = null;
      },
      deleteReservationFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      },
      updateReservationRequest(state) {
        state.loading = true;
        state.error = null;
        state.message = null;
      },
      updateReservationSuccess(state, action) {
        state.loading = false;
        state.message = action.payload;
        state.error = null;
      },
      updateReservationFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
      },
      resetReservationSlice(state) {
        state.error = null;
        state.reservations = state.reservations;
        state.message = null;
        state.loading = false;
      },
      clearAllErrors(state) {
        state.error = null;
      },
  }

});

export const getAllReservations = () => async (dispatch) => {
  dispatch(reservationSlice.actions.getAllReservationRequest());
  try {
    const { data } = await axios.get("https://coffeeshopbackend.onrender.com/api/reservations", {
      withCredentials: true,
    });
    console.log("Fetched Reservations:", data); // Debugging
    dispatch(reservationSlice.actions.getAllReservationSuccess(data.reservations));
    dispatch(reservationSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Error fetching reservations:", error.response?.data?.message);
    dispatch(reservationSlice.actions.getAllReservationFailed(error?.response?.data?.message));
  }
};

  export const makeReservation = (reservationData) => async (dispatch) => {
    dispatch(reservationSlice.actions.makeReservationRequest());
    try {
      const { data } = await axios.post(
        "https://coffeeshopbackend.onrender.com/api/reservations/make",
        reservationData,
        { withCredentials: true }
      );
      dispatch(reservationSlice.actions.makeReservationSuccess(data.message));
      dispatch(reservationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(reservationSlice.actions.makeReservationFailed(error.response.data.message));
    }
  };

  export const deleteReservation = (id) => async (dispatch) => {
    dispatch(reservationSlice.actions.deleteReservationRequest());
    try {
      const { data } = await axios.delete(
        `https://coffeeshopbackend.onrender.com/api/reservations/delete/${id}`,
        { withCredentials: true }
      );
      dispatch(reservationSlice.actions.deleteReservationSuccess(data.message));
      dispatch(reservationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(reservationSlice.actions.deleteReservationFailed(error.response.data.message));
    }
  };

  export const updateReservationStatus = ({id, status}) => async (dispatch) => {
    dispatch(reservationSlice.actions.updateReservationRequest());
    try {
      const { data } = await axios.put(
        `https://coffeeshopbackend.onrender.com/api/reservations/update/${id}`,
        { status },
        { withCredentials: true }
      );
      dispatch(reservationSlice.actions.updateReservationSuccess(data.message));
      dispatch(reservationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(reservationSlice.actions.updateReservationFailed(error.response.data.message));
    }
  };
  export const resetReservationSlice = () => (dispatch) => {
    dispatch(reservationSlice.actions.resetReservationSlice());
  };
  
  // ✅ Clear Errors
  export const clearAllReservationErrors = () => (dispatch) => {
    dispatch(reservationSlice.actions.clearAllErrors());
  };

export default reservationSlice.reducer;