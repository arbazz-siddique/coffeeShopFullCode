import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PlaceOrder, clearAllPlaceOrder } from "../store/slices/orderSlice";
import { getAllMenu } from "../store/slices/menuSlice"; // Fetch menu items
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ManageOrder = () => {
  const [selectedItems, setSelectedItems] = useState([]); // Store selected item IDs
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.order);
  const { menuItems } = useSelector((state) => state.menu); // Fetch menu items from Redux store

  // Fetch menu items when the component mounts
  useEffect(() => {
    dispatch(getAllMenu());
  }, [dispatch]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      toast.error("Please select at least one item.");
      return;
    }

    const orderData = {
      items: selectedItems, // Send selected item IDs
      total: Number(total),
    };

    dispatch(PlaceOrder(orderData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllPlaceOrder());
    }

    if (message) {
      toast.success(message);
      dispatch(clearAllPlaceOrder());
    }
  }, [error, message, dispatch]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handlePlaceOrder} className="w-[100%] px-5 md:w-[1000px]">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
              PLACE ORDER
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Select Menu Items
                </label>
                <div className="mt-2">
                  <Select
                    onValueChange={(value) =>
                      setSelectedItems([...selectedItems, value])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select items" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.map((item) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Total Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter total price"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoadingButton content={"Placing Order..."} width={"w-56"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-56"
            >
              Place Order
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageOrder;