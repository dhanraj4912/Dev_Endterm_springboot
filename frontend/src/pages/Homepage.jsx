// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <h1>Wholesale Management System</h1>

      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/retailers">Retailers</Link></li>
          <li><Link to="/credit">Credit</Link></li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
      </nav>
    </div>
  );
}