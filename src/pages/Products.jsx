import { useMemo, useState } from "react";
import { PLANTS, CATEGORIES } from "../data/plants";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectHasItem } from "../features/cart/cartSlice";

export default function Products() {
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();
  const hasItem = (id) => useSelector(selectHasItem(id)); // hook must be top-level

  // Workaround: map selected status outside of hook rule
  const itemsWithStatus = useMemo(
    () =>
      PLANTS.map((p) => ({
        ...p,
        // a tiny custom selector component for each card (keeps rules intact)
        Card: function Card() {
          const isInCart = useSelector(selectHasItem(p.id));
          return (
            <article className="card">
              <img src={p.image} alt={p.name} />
              <div className="cardBody">
                <h3>{p.name}</h3>
                <p className="price">${p.price.toFixed(2)}</p>
                <p className="chip">{p.category}</p>
                <button
                  className="btn"
                  onClick={() => dispatch(addToCart(p))}
                  disabled={isInCart}
                  aria-disabled={isInCart}
                  title={isInCart ? "Already in cart" : "Add to cart"}
                >
                  {isInCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            </article>
          );
        },
      })),
    [dispatch]
  );

  const visible =
    filter === "All"
      ? itemsWithStatus
      : itemsWithStatus.filter((p) => p.category === filter);

  return (
    <div className="page">
      <h2>Our Plants</h2>

      <div className="filters">
        <button
          className={`chip ${filter === "All" ? "active" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`chip ${filter === c ? "active" : ""}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid">
        {visible.map((p) => (
          <p.Card key={p.id} />
        ))}
      </div>
    </div>
  );
}
