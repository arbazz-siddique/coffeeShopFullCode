import Login from "./pages/Login"

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ManageMenu from "./pages/ManageMenu"
import ManageOrder from "./pages/ManageOrder"
import Reservation from "./pages/Reservation"
import Review from "./pages/Review"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux"

import HomePage from "./pages/HomePage"
import { getAllMenu } from "./store/slices/menuSlice"
import { getAllOrder } from "./store/slices/orderSlice"
import { getAllReservations } from "./store/slices/reservationSlice"
import { getAllReviews } from "./store/slices/reviewSlice"
import Dashboard from "./pages/sub-components/Dashboard"
import UpdateMenuItem from "./pages/UpdateMenuItem"
import UpdateReservation from "./pages/UpdateReservation"
import UpdateOrder from "./pages/UpdateOrder"
import { getUser } from "./store/slices/userSlice"

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUser())
    dispatch(getAllMenu());
    dispatch(getAllOrder());
    dispatch(getAllReservations())
    dispatch(getAllReviews())
  },[dispatch])
  return (
   <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/manage/menu" element={<ManageMenu/>} />
      <Route path="/manage/order" element={<ManageOrder/>} />
      <Route path="/reservation" element={<Reservation/>} />
      <Route path="/review" element={<Review/>} />
      <Route path="/update-menu/:id" element={<UpdateMenuItem/>} />
      <Route path="/update-reservation/:id" element={<UpdateReservation />} />
      <Route path="/update-order/:id" element={<UpdateOrder />} />

    </Routes>
    <ToastContainer position="bottom-right" theme="dark"/>
   </Router>
  )
}

export default App