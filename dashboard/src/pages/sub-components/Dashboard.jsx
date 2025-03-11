// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   // Example menu items (replace with your actual data)
//   const { loading, error, message, menuItems } = useSelector((state) => state.menu);
//   // const menuItems = [
//   //   { _id: "1", name: "Coffee", price: 5, description: "Hot coffee" },
//   //   { _id: "2", name: "Tea", price: 3, description: "Green tea" },
//   // ];

//   const handleEdit = (itemId) => {
//     navigate(`/update-menu/${itemId}`);
//   };

//   return (
//     <div>
//       <h1>Menu Items</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {menuItems.map((item) => (
//             <tr key={item._id}>
//               <td>{item.name}</td>
//               <td>${item.price}</td>
//               <td>
//                 <Button onClick={() => handleEdit(item._id)}>Edit</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getAllReviews } from "@/store/slices/reviewSlice";
import {
  getAllReservations,
  deleteReservation,
} from "@/store/slices/reservationSlice";
import { getAllMenu, deleteMenu } from "@/store/slices/menuSlice";
import { getAllOrder, deletePlaceOrder } from "@/store/slices/orderSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviews } = useSelector((state) => state.review);
  const { reservations } = useSelector((state) => state.reservation);
  const { menuItems } = useSelector((state) => state.menu);
  const { orders = [] } = useSelector((state) => state.order);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as per your requirement
  };

  const formatTime = (timeString) => {
    return timeString; // You can format this further if needed
  };

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllReservations());
    dispatch(getAllMenu());
    dispatch(getAllOrder()); // ✅ Fetch Orders when the component loads
  }, [dispatch]);

  const handleEdit = (orderId) => {
    navigate(`/update-menu/${orderId}`);
  };
  const handleEditReservation = (reservationId) => {
    navigate(`/update-reservation/${reservationId}`); // Ensure `reservationId` is the correct ID
  };

  const handleEditOrder = (orderId) => {
    navigate(`/update-order/${orderId}`);
  };

  const handleDelete = (type, id) => {
    switch (type) {
      case "reservation":
        dispatch(deleteReservation(id));
        toast.success("Reservation deleted successfully");
        break;
      case "menu":
        dispatch(deleteMenu(id));
        toast.success("Menu item deleted successfully");
        break;
      case "order":
        dispatch(deletePlaceOrder(id));
        toast.success("Order deleted successfully");
        break;
      case "review":
        dispatch(deleteReview(id));
        toast.success("Review delted successfully");
        break;

      default:
        break;
    }
  };

  return (
    <div className="px-20 w-screen space-y-6">
      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Menu Item</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review.user?.name || "Anonymous"}</TableCell>
                  <TableCell>{review?.menuItem?.name || "Unknown"}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete("review", review._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ): (
              <TableRow>
                <TableCell colSpan="5" className="text-center text-2xl">
                  No Reviews Found
                </TableCell>
              </TableRow>
            )
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Reservations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="md:table-cell text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <TableRow key={reservation._id}>
                  <TableCell>{reservation.user?.name}</TableCell>
                  <TableCell>{formatDate(reservation.date)}</TableCell>
                  <TableCell>{formatTime(reservation.time)}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>
                    <Button
                      className="mr-4"
                      onClick={() =>
                        handleDelete("reservation", reservation._id)
                      }
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleEditReservation(reservation._id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ):(
              <TableRow>
                <TableCell colSpan="5" className="text-center text-2xl">
                  No Reservation Found
                </TableCell>
              </TableRow>
            )
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Menu Items Section */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="md:table-cell text-left">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            {/* here i have to modeify */}
            <TableBody>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Button
                      className="mr-5"
                      onClick={() => handleDelete("menu", item._id)}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => handleEdit(item._id)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ):(
              <TableRow>
                <TableCell colSpan="5" className="text-center text-2xl">
                  No Items Found
                </TableCell>
              </TableRow>
            )
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Orders Section */}

      {/* Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.user?.name || "Unknown"}</TableCell>
                    <TableCell>
                      {order.items.map((item) => item.name).join(", ")}
                    </TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <Button
                        className="mr-5"
                        onClick={() => handleDelete("order", order._id)}
                      >
                        Delete
                      </Button>
                      <Button onClick={() => handleEditOrder(order._id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center text-2xl">
                    No Orders Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
