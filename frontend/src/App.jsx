import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import Receipts from "./pages/Receipts";
import ReceiptForm from "./pages/ReceiptForm";
import Deliveries from "./pages/Deliveries";
import DeliveryForm from "./pages/DeliveryForm";
import Transfers from "./pages/Transfers";
import TransferForm from "./pages/TransferForm";
import Adjustments from "./pages/Adjustments";
import AdjustmentForm from "./pages/AdjustmentForm";
import MoveHistory from "./pages/MoveHistory";
import Warehouse from "./pages/Warehouse";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/receipts/new" element={<ReceiptForm />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/deliveries/new" element={<DeliveryForm />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/transfers/new" element={<TransferForm />} />
        <Route path="/adjustments" element={<Adjustments />} />
        <Route path="/adjustments/new" element={<AdjustmentForm />} />
        <Route path="/move-history" element={<MoveHistory />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
