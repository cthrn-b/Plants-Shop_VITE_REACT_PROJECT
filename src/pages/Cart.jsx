import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeItem,
  selectItems,
  selectTotalCost,
  selectTotalCount,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useSelector(selectItems);
  const totalCount = useSelector(selectTotalCount);
  const totalCost = useSelector(selectTotalCost);
  const dispatch = useDispatch();

  return (
    <div className="page">
      <h2>Your Cart</h2>

      <div className="summary">
        <div>Total plants: <strong>{totalCount}</strong></div>
        <div>Total cost: <strong>${totalCost.toFixed(2)}</strong></div>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>
      ) : (
        <>
          <ul className="cartList">
            {items.map((it) => (
              <li key={it.id} className="cartRow">
                <img src={it.image} alt={it.name} />
                <div className="info">
                  <h4>{it.name}</h4>
                  <div className="muted">Unit: ${it.price.toFixed(2)}</div>
                </div>

                <div className="qty">
                  <button onClick={() => dispatch(decrement(it.id))}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => dispatch(increment(it.id))}>+</button>
                </div>

                <div className="lineTotal">
                  ${(it.qty * it.price).toFixed(2)}
                </div>

                <button
                  className="link danger"
                  onClick={() => dispatch(removeItem(it.id))}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <div className="actionsRow">
            <Link to="/products" className="btn ghost">
              ← Continue Shopping
            </Link>
            <button
              className="btn"
              onClick={() => alert("Coming Soon")}
              aria-label="Checkout"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
