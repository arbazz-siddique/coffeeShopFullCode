import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaceOrder, getAllOrder } from "@/store/slices/orderSlice";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const order = orders.find((order) => order._id === id);
    if (order) setStatus(order.status);
  }, [orders, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePlaceOrder(id, { status }));
    toast.success("Order status updated successfully!");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
      <Card className="w-[450px] bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 text-center">
            Update Order Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label className="text-gray-700 text-sm font-medium">Order Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdateOrder;
