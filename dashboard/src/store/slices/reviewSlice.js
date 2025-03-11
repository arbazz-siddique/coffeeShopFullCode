import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
    message: null,
  },
  reducers: {
    getReviewsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getReviewsSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
      state.error = null;
    },
    getReviewsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addReviewRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addReviewSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addReviewFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteReviewRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteReviewSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
      // Remove the deleted review from the state
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload.id
      );
    },
    deleteReviewFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetReviewSlice(state) {
      state.error = null;
      state.reviews = state.reviews;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const getAllReviews = () => async (dispatch) => {
  dispatch(reviewSlice.actions.getReviewsRequest());
  try {
    const response = await axios.get("https://coffeeshopbackend.onrender.com/api/reviews");
    dispatch(reviewSlice.actions.getReviewsSuccess(response.data.reviews));
  } catch (error) {
    dispatch(reviewSlice.actions.getReviewsFailed(error?.response?.data?.message));
  }
};

export const addReview = (reviewData) => async (dispatch) => {
  dispatch(reviewSlice.actions.addReviewRequest());
  try {
    const response = await axios.post("https://coffeeshopbackend.onrender.com/api/reviews/update", reviewData, {
      withCredentials: true,
    });
    dispatch(reviewSlice.actions.addReviewSuccess(response.data.message));
  } catch (error) {
    dispatch(reviewSlice.actions.addReviewFailed(error.response.data.message));
  }
};

export const deleteReview = (id) => async (dispatch) => {
  dispatch(reviewSlice.actions.deleteReviewRequest());
  try {
    const { data } = await axios.delete(
      `https://coffeeshopbackend.onrender.com/api/reviews/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(reviewSlice.actions.deleteReviewSuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(reviewSlice.actions.deleteReviewFailed(error.response.data.message));
  }
};


export const resetReviewSlice = () => (dispatch) => {
    dispatch(reviewSlice.actions.resetReviewSlice());
  };
  
export const clearAllReviewErrors = () => (dispatch) => {
  dispatch(reviewSlice.actions.clearAllErrors());
};

export default reviewSlice.reducer;
