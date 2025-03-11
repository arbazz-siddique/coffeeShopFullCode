import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Home } from "lucide-react";
import bgImage from "/about-image.jpg";
import { handleSuccess, handleError } from "@/utils";  // Import the toast functions

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://coffeeshopbackend.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", data.token);
      handleSuccess("Login successful!"); // Show success message
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed!";
      handleError(errorMsg); // Show error message
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
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
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
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 text-base md:text-lg transition-all">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm md:text-base text-white">
            <p>
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:text-blue-800 transition-all p-0"
              >
                Sign up
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
