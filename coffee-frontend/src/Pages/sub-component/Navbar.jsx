import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleNavigation = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#3B141C] shadow-md">
      <nav className="flex justify-between items-center p-5">
        <Link to="/" className="text-[#FAEBD7] text-2xl font-bold">
          ☕Coffee
        </Link>
        <button
          className="md:hidden text-[#FAEBD7] focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
        <ul className={`hidden md:flex items-center gap-6`}>
          <li>
            <Link to="/" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleNavigation("about")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("menu")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Menu
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("testimonials")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Testimonials
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("gallery")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Gallery
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("contact")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Contact
            </button>
          </li>
          <li>
            <Link to="/reservations" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Reservations
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={logout} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
                Login
              </Link>
            )}
          </li>
        </ul>
        <div className="relative" onClick={toggleCart}>
          <ShoppingCart className="text-[#FAEBD7] w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </div>
      </nav>

      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col items-center gap-4 mt-2">
          <li>
            <Link to="/" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <button onClick={() => handleNavigation("about")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              About
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("menu")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Menu
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("testimonials")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Testimonials
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("gallery")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Gallery
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation("contact")} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Contact
            </button>
          </li>
          <li>
            <Link to="/reservations" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
              Reservations
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={logout} className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-[#FAEBD7] hover:text-white hover:bg-[#FAEBD7] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-300">
                Login
              </Link>
            )}
          </li>
        </ul>
      )}

      {isCartOpen && (
        <div className="fixed top-12 right-4 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-64">
          <h3 className="text-lg font-semibold">Cart Items</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between items-center border-b border-gray-700 py-2">
                  <span>{item.name}</span>
                  <Button size="sm" variant="destructive" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Cart is empty</p>
          )}
          <Button className="mt-3 w-full bg-blue-600" onClick={() => navigate("/cart")}>
            View Cart
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
