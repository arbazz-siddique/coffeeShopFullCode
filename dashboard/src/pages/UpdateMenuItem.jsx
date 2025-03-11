import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenu, updateMenu } from "@/store/slices/menuSlice";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdateMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menuItems, loading } = useSelector((state) => state.menu);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getAllMenu());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && menuItems.length > 0 && id) {
      const item = menuItems.find((item) => item._id === id);
      if (item) {
        setFormData({
          name: item.name,
          price: item.price,
          description: item.description,
        });
      }
    }
  }, [menuItems, id, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMenu({ id, newData: formData }));
    toast.success("Menu item updated successfully!");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 px-[200px]">
      <Card className="w-[500px] p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-800">
            Update Menu Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter menu item name"
              className="w-full"
              required
            />
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Enter price"
              className="w-full"
              required
            />
            <Input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description"
              required
            />

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/manage/menu")}
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

export default UpdateMenuItem;