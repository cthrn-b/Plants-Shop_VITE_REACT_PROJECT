import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="landing">
      <div className="overlay">
        <h1>Plantify Co.</h1>
        <p>
          We curate happy, low-maintenance houseplants to brighten your home.
          Delivered with care, planted with love.
        </p>
        <Link to="/products" className="btn">Get Started</Link>
      </div>
    </section>
  );
}
