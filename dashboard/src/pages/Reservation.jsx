import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  makeReservation,
  clearAllReservationErrors,
  resetReservationSlice,
  getAllReservations,
} from "../store/slices/reservationSlice";

const Reservation = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const dispatch = useDispatch();
  const { reservations, loading, error, message } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllReservationErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearAllReservationErrors());
      dispatch(getAllReservations()); // Refresh reservations after making a new one
    }
  }, [error, message, dispatch]);

  const handleMakeReservation = async (e) => {
    e.preventDefault();

    const reservationData = {
      date,
      time,
      numberOfPeople: Number(numberOfPeople),
    };

    dispatch(makeReservation(reservationData));
    dispatch(resetReservationSlice());
    dispatch(clearAllReservationErrors());
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <div className="w-full px-5 md:w-[1000px]">
        <form onSubmit={handleMakeReservation} className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              MAKE A RESERVATION
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Reservation Date
                </label>
                <input
                  type="date"
                  className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Reservation Time
                </label>
                <input
                  type="time"
                  className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {loading ? (
              <SpecialLoadingButton content="Making Reservation..." width="w-56" />
            ) : (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 w-56"
              >
                Make Reservation
              </button>
            )}
          </div>
        </form>

        {/* Reservation List */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
          <ul className="list-disc pl-5">
            {reservations.length > 0 ? (
              reservations.map((res) => (
                <li key={res._id} className="mb-3">
                  <p>Date: {new Date(res.date).toLocaleDateString()}</p>
                  <p>Time: {res.time}</p>
                  <p>People: {res.numberOfPeople}</p>
                  <p>Status: {res.status}</p>
                </li>
              ))
            ) : (
              <p>No Reservations Found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
