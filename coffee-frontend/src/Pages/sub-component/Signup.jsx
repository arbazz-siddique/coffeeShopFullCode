import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Mail, Lock, User, Home } from "lucide-react";
import bgImage from "/about-image.jpg";
import { handleError, handleSuccess } from "@/utils";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post(
        "https://coffeeshopbackend.onrender.com/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      handleSuccess("singup successful!"); 
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
      handleError("Signup failed!"); // Show error message
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Button
        onClick={() => navigate("/")}
        className="absolute top-5 right-5 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-300 text-sm md:text-base"
      >
        <Home size={16} /> Back to Home
      </Button>

      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white/30 backdrop-blur-md p-6 md:p-10 border-none shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-500 font-semibold text-base md:text-lg text-center mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 py-2 md:py-3 text-sm md:text-base"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 py-2 md:py-3 text-sm md:text-base"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 py-2 md:py-3 text-sm md:text-base"
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 text-base md:text-lg transition-all">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm md:text-base text-white">
            <p>
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:text-blue-800 transition-all p-0"
              >
                Login
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
