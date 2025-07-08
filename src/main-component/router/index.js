// src/main-component/router/index.js

import React from "react";
import { Routes, Route } from "react-router-dom";

// === ROUTE WRAPPERS IMPORT KAREIN ===
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// === PUBLIC PAGE IMPORTS (Unchanged) ===
import Homepage from "../HomePage";
// ...baki saare public page imports...
import AboutPage from "../AboutPage";
import ShopPage from "../ShopPage";
import ProductDetailsPage from "../ProductDetailsPage";
import CartPage from "../CartPage";
import WishlistPage from "../WishlistPage";
import ErrorPage from "../ErrorPage";
import ContactPage from "../ContactPage";
import LoginPage from "../LoginPage";
import SignUpPage from "../SignUpPage";
import Blog from "../BlogPage";
import ForgotPassword from "../ForgotPassword";

// === DASHBOARD IMPORTS (Unchanged) ===
import AdminLayout from "../../Layout/AdminLayout";
import UserDashboardLayout from "../../Layout/UserDashboardLayout";
// ...baki saare dashboard page imports...
import UserDashboardPage from "../../pages/user/UserDashboardPage";
import MyOrdersPage from "../../pages/user/MyOrdersPage";
import ProfilePage from "../../pages/user/ProfilePage";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import ManageProductsPage from "../../pages/admin/ManageProductsPage";
import ManageOrdersPage from "../../pages/admin/ManageOrdersPage";
import ManageUsersPage from "../../pages/admin/ManageUsersPage";
import Addresspage from "../../pages/user/AddressPage";
import WishlistPages from "../../pages/user/WishlistPages";
import OrderDetailPage from "../../pages/user/OrderDetailPage";
import AddEditProductPage from "../../pages/admin/AddEditProductPage";

const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product-single/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/404" element={<ErrorPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="addedit" element={<AddEditProductPage />} />
      <Route
        path="/user/*"
        element={
          <PrivateRoute>
            <UserDashboardLayout />
          </PrivateRoute>
        }
      >
        {/* UserDashboardLayout ke andar ke saare routes apne aap protected ho jayenge */}
        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<Addresspage />} />
        <Route path="wishlist" element={<WishlistPages />} />
        <Route path="orders/:orderId" element={<OrderDetailPage />} />

        {/* ...baki user dashboard routes... */}
      </Route>
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* AdminLayout ke andar ke saare routes apne aap protected ho jayenge */}
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="products" element={<ManageProductsPage />} />
        <Route path="orders" element={<ManageOrdersPage />} />
        <Route path="users" element={<ManageUsersPage />} />

        {/* ...baki admin dashboard routes... */}
      </Route>
    </Routes>
  );
};

export default AllRoute;
