import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  // const fetchReservations = async () => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No token found, please login again.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("https://coffeeshopbackend.onrender.com/api/reservations", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setReservations(response.data.reservations);
  //   } catch (error) {
  //     console.error("Error fetching reservations:", error.response?.data || error.message);
  //   }
  // };

  const fetchReservations = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found, please login again.");
      return;
    }
  
    try {
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Assuming the ID is stored as 'id' in the token
  
      const response = await axios.get("https://coffeeshopbackend.onrender.com/api/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Filter reservations to show only the logged-in user's reservations
      const userReservations = response.data.reservations.filter(
        (res) => res.user._id === userId
      );
  
      setReservations(userReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error.response?.data || error.message);
    }
  };
  


  const handleReservation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, authentication required.");
        return;
      }

      const response = await axios.post(
        "https://coffeeshopbackend.onrender.com/api/reservations/make",
        { date, time, numberOfPeople },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      fetchReservations(); // Refresh reservations
    } catch (error) {
      console.error("Error making reservation:", error.response?.data || error.message);
    }
  };

  const updateReservationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://coffeeshopbackend.onrender.com/api/reservations/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchReservations(); // Refresh reservations
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://coffeeshopbackend.onrender.com/api/reservations/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchReservations(); // Refresh reservations
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Make a Reservation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Number of People"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
      </div>
      <Button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleReservation}>
        Reserve Table
      </Button>

      <h2 className="text-xl font-bold mt-6 mb-4">Your Reservations</h2>
      <ul className="space-y-4">
        {reservations.map((res) => (
          <li key={res._id} className="border p-4 rounded shadow-md">
            <p>Date: {new Date(res.date).toLocaleDateString()}</p>
            <p>Time: {res.time}</p>
            <p>People: {res.numberOfPeople}</p>
            <p>Status: <span className="font-bold">{res.status}</span></p>
            <div className="mt-2 flex gap-2">
              <Button onClick={() => updateReservationStatus(res._id, "cancelled")} className="bg-red-500 text-white">
                Cancel
              </Button>
              <Button onClick={() => deleteReservation(res._id)} className="bg-red-500 text-white">
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservation;
