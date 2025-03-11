import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, addReview, clearAllReviewErrors, resetReviewSlice } from "../store/slices/reviewSlice";
import { getAllMenu, resetMenuSlice } from "@/store/slices/menuSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const Review = () => {
  const dispatch = useDispatch();
  const { loading, reviews, error, message } = useSelector((state) => state.review);
  const { menuItems=[] } = useSelector((state) => state.menu);

  const [selectedMenuItem, setSelectedMenuItem] = useState(""); // Store menuItemId instead of name
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllMenu()); // Fetch menu items
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllReviewErrors());
    
    }
    if (message) {
      toast.success(message);
      dispatch(resetReviewSlice())
    }
  }, [error, dispatch,message]);


  const handleAddReview = (e) => {
    e.preventDefault();

    if (!selectedMenuItem) {
      toast.error("Please select a menu item.");
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5.");
      return;
    }

    dispatch(addReview({ menuItemId: selectedMenuItem, rating, comment }));

    // Clear form after submission
    setSelectedMenuItem("");
    setRating("");
    setComment("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-[200px]">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Manage Reviews</h1>

        <form onSubmit={handleAddReview} className="mb-6">
          {/* Dropdown for selecting a menu item (stores ID, not name) */}
          <select
            value={selectedMenuItem}
            onChange={(e) => setSelectedMenuItem(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-3 rounded-md bg-white text-black"
          >
            <option value="">Select Menu Item</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-3 rounded-md bg-white text-black"
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 p-3 w-full mb-3 rounded-md bg-white text-black"
          ></textarea>
          <Button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded-md">
            Submit Review
          </Button>
        </form>
{/* 
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">All Reviews</h2>
        <ul className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <p><strong>User:</strong> {review.user?.name || "Anonymous"}</p>
                <p><strong>Menu Item:</strong> {review.menuItem?.name || "Unknown"}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No reviews found.</p>
          )}
        </ul> */}
      </div>
    </div>
  );
};

export default Review;
