import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}
