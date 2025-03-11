import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateReservationStatus, getAllReservations } from "@/store/slices/reservationSlice";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UpdateReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservations, loading } = useSelector((state) => state.reservation);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  useEffect(() => {
    if (reservations.length > 0 && id) {
      const reservation = reservations.find((res) => res._id === id);
      if (reservation) setStatus(reservation.status);
    }
  }, [reservations, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      toast.error("Reservation ID is missing.");
      return;
    }
    dispatch(updateReservationStatus({ id, status })); // Pass `id` and `status`
    toast.success("Reservation updated successfully!");
    navigate("/");
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Update Reservation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateReservation;