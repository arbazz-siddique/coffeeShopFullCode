import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, MessageCircle, Loader2 } from "lucide-react";
import { handleSuccess, handleError } from "@/utils";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://coffeeshopbackend.onrender.com/api/contacts/contact", form);
      setResponseMessage(data.message || "Message sent successfully!");
      handleSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      setResponseMessage(errorMsg);
      handleError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6" id="contact">
      <Card className="w-full max-w-3xl bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-white drop-shadow-lg">
            Contact Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          {responseMessage && (
            <p className={`text-center text-lg mb-4 font-semibold transition-all duration-300 ${responseMessage.includes("success") ? "text-green-300" : "text-red-400"}`}>
              {responseMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-4 text-white/70" size={24} />
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="pl-14 py-4 text-lg bg-black/10 border border-black/10 placeholder-cyan-400 text-white focus:ring-2 focus:ring-white rounded-xl transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-white/70" size={24} />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="pl-14 py-4 text-lg bg-black/10 border border-black/10 placeholder-cyan-400 text-white focus:ring-2 focus:ring-white rounded-xl transition-all duration-300"
              />
            </div>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-4 text-white/70" size={24} />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full pl-14 py-4 text-lg bg-black/10 border border-black/10 placeholder-cyan-400 text-white focus:ring-2 focus:ring-white rounded-xl h-32 transition-all duration-300"
              ></textarea>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white/30 text-white font-bold text-lg py-4 rounded-xl hover:bg-white/50 hover:text-black transition-all duration-300 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={24} /> : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;
