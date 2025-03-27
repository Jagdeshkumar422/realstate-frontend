import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import SellerDashboard from "./Layouts/SellerDashboard";
import BuyerLayout from "./Layouts/BuyerLayout";
import AdminLayout from "./Layouts/AdminLayout";
import SliderImages from "./Components/AdminDashboard/SliderImages/SliderImages";
import Buypage from "./Components/AdminDashboard/Buy/BuyPage";
import Rentpage from "./Components/AdminDashboard/Rent/RentPage";
import UsersPage from "./Components/AdminDashboard/Users/usersPage";
import NewsPage from "./Components/AdminDashboard/News/NewsPage";
import Layout from "./Layouts/UserLayout";
import Home from "./Pages/Home";
import CategoriesLayout from "./Layouts/CategoriesLayout";
import BuyPage from "./Pages/Properties/Buy/BuyPage";
import RentPage from "./Pages/Properties/Rent/RentPage";
import Singlepage from "./Pages/Singlepage/singlepage";
import AllSellerProperties from "./Components/buyerDashboard/AllSellerProperties/AllSellerProperties";
import SellerBuy from "./Components/buyerDashboard/Buy/BuyPage";
import RentBuyer from "./Components/buyerDashboard/Rent/RentPage";
import SellerProfile from "./Components/buyerDashboard/SellerProfile/SellerProfile";
import Chat from "./Components/Chat/Chat";
import ChatList from "./Components/ChatList/ChatList";
import Message from "./Components/buyerDashboard/Messages/Message";
import Aboutus from "./Pages/Aboutus/Aboutus";
import Contactus from "./Pages/ContactUs/Contactus";
import Profile from "./Pages/Profile/Profile";
import Messages from "./Pages/Messages/Messages";

// Decode role from the token
const getUserData = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return { token, role: decodedToken.role }; // Ensure 'role' is part of your JWT payload
    } catch (error) {
      console.error("Invalid token:", error);
      return { token: null, role: null };
    }
  }
  return { token: null, role: null };
};

// ProtectedRoute Component for role-based redirection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = getUserData();

  if (!token) {
    // Redirect to home if no token
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to home if role is not allowed
    return <Navigate to="/" replace />;
  }

  // Allow access to the route
  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:id" element={<ChatList/>}/>
        <Route path="/chats" element={<ChatList/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
        <Route path="/contactus" element={<Contactus/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/messages" element={<Messages/>}/>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/property/:type/:id" element={<Singlepage />} />
        </Route>

        <Route path="/" element={<CategoriesLayout />}>
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/rent" element={<RentPage />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin-dashboard/slider-images" element={<SliderImages />} />
          <Route path="/admin-dashboard/buy" element={<Buypage />} />
          <Route path="/admin-dashboard/rent" element={<Rentpage />} />
          <Route path="/admin-dashboard/users" element={<UsersPage />} />
          <Route path="/admin-dashboard/news" element={<NewsPage />} />
        </Route>
        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <BuyerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/seller-dashboard/all-properties" element={<AllSellerProperties />} />
          <Route path="/seller-dashboard/sell" element={<SellerBuy />} />
          <Route path="/seller-dashboard/rent" element={<RentBuyer />} />
          <Route path="/seller-dashboard/profile" element={<SellerProfile />} />
          <Route path="/seller-dashboard/messages" element={<Message />} />
        </Route>
        {/* <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
