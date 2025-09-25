import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalCount } from "../features/cart/cartSlice";

export default function Header() {
  const count = useSelector(selectTotalCount);

  return (
    <header className="header">
      <Link to="/" className="brand">Plantify Co.</Link>
      <nav className="nav">
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart" className="cartLink">
          🛒 <span className="badge">{count}</span>
        </NavLink>
      </nav>
    </header>
  );
}
