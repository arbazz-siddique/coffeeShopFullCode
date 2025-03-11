import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get("https://coffeeshopbackend.onrender.com/api/menu/get");
        setMenuItems(data.menuItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("https://coffeeshopbackend.onrender.com/api/reviews");
        setReviews(data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const openReviewModal = (item) => {
    setSelectedItem(item);
    setReviewModal(true);
  };

  const submitReview = async () => {
    try {
      await axios.post(
        "https://coffeeshopbackend.onrender.com/api/reviews/update",
        { menuItemId: selectedItem._id, rating, comment },
        { withCredentials: true }
      );
      alert("Review submitted successfully!");
      setReviewModal(false);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Try again!");
    }
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== item._id));
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        items: cart.map(({ _id, quantity }) => ({ _id, quantity })),
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      };

      await axios.post("https://coffeeshopbackend.onrender.com/api/orders/create", orderData, {
        withCredentials: true,
      });

      alert("Order placed successfully!");
      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again!");
    }
  };

  return (
    <div className="order-container p-4 md:p-6 lg:p-8">
      <h2 className="text-xl font-bold mb-4 md:text-2xl">Order Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-lg">
            <img src={item.image.url} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-sm">{item.description}</p>
            <p className="text-md font-bold mt-2">${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart mt-6 p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Cart</h3>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b py-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
              <button onClick={() => openReviewModal(item)} className="text-blue-500">Review</button>
              <button onClick={() => removeFromCart(item)} className="text-red-500">Remove</button>
            </div>
          ))}
          <h4 className="text-md font-bold mt-4">Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
          <button
            onClick={placeOrder}
            className="mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      )}

      {/* Review Modal */}
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <Star
                    key={num}
                    className={`cursor-pointer ${rating >= num ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => setRating(num)}
                  />
                ))}
              </div>
              <Textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} />
              <Button onClick={submitReview} className="bg-green-500 hover:bg-green-700">Submit</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Order;
