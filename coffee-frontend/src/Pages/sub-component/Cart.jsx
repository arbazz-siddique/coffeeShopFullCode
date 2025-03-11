import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

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
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again!");
    }
  };

  return (
    <section className="bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-10">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cart.map((item) => (
                <Card key={item._id} className="overflow-hidden rounded-2xl shadow-lg bg-gray-800">
                  <CardHeader className="p-0 overflow-hidden">
                    <div className="relative w-full h-40">
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-gray-200">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {item.description}
                    </CardDescription>
                    <p className="mt-4 font-bold text-lg text-primary">
                      ₹{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center space-x-4">
                      <Button
                        onClick={() => decreaseQuantity(item._id)}
                        className="bg-red-600 text-white px-4 py-2"
                      >
                        -
                      </Button>
                      <span className="text-white text-lg">{item.quantity}</span>
                      <Button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-green-600 text-white px-4 py-2"
                      >
                        +
                      </Button>
                    </div>

                    {/* Remove Item Button */}
                    <Button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-3 bg-red-500 text-white py-2 px-4 w-full"
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Total Price & Order Button */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-200">
                Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
              </h3>
              <Button
                onClick={placeOrder}
                className="mt-4 bg-green-500 text-white py-3 px-6 text-lg rounded-lg hover:bg-green-700"
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;