import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token")); // ✅ Track token in state

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        if (!token) {
          setUser({}); // Clear user if token is missing
          return;
        }

        const { data } = await axios.get(
          "https://coffeeshopbackend.onrender.com/api/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setUser(data.user);
      } catch (error) {
        setUser({});
      }
    };

    getMyProfile();
  }, [token]); // ✅ Now, effect runs only when token changes

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token")); // ✅ Update token when storage changes
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className="hero-section">
      <div className="section-content">
        <div className="hero-details">
          <h2 className="subtitle">
            {user?.name ? `Welcome Back ${user.name}` : "Welcome Guest"}
          </h2>

          <h2 className="title">Best Coffee</h2>
          <h3 className="subtitle">
            Make your day great with our special coffee!
          </h3>
          <p className="description">
            Welcome to our coffee paradise, where every bean tells a story and
            every cup sparks joy.
          </p>
          <div className="buttons">
            <Link to="/Order" className="button order-now">
              Order Now
            </Link>
            <Link to="/contact" className="button contact-us">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src={"./coffee-hero-section.png"}
            alt="Hero"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
