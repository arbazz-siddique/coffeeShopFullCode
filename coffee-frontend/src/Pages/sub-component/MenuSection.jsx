import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext"; // Import Cart Context
import { useNavigate } from "react-router-dom";

const MenuSection = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart(); // Get function to add items to cart

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("https://coffeeshopbackend.onrender.com/api/menu/get", {
          withCredentials: true,
        });

        setMenuItems(response.data.menuItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <section className="bg-gray-800 py-12 px-4 " id="menu">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-100 mb-10">
          Our Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menuItems?.map((item) => (
            <Card
              key={item._id}
              className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="p-0 overflow-hidden">
                <div className="relative w-full h-56">
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                <Button
                  onClick={() => addToCart(item)}
                  className="mt-4 w-full bg-primary hover:bg-primary/80 text-gray-800 font-bold py-2 rounded-lg transition-all duration-300"
                >
                  Add to Cart
                </Button>
                {/* <Button 
                  onClick={() => navigate("/cart")} 
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all duration-300"
                >
                  View Cart
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
