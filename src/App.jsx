import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route path="/admin" element={<Admin />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;