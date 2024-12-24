import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0); // State for pending transaction count

  useEffect(() => {
    // Fetch pending transactions count from the backend
    const fetchPendingTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transactions");
        if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.status}`);
        }
        const data = await response.json();
        setPendingCount(data.length); // Set the count of pending transactions
      } catch (error) {
        console.error("Error fetching pending transactions:", error);
        setPendingCount(0); // Fallback to 0 in case of error
      }
    };

    fetchPendingTransactions();
  }, []); // Fetch once when the component mounts

  return (
    <nav aria-label="Main Navigation">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="navbar-brand">
          <img src={logo} alt="MotionCoin Logo" className="logo" />
          <p>MotionCoin</p>
        </div>
      </Link>
      <div className="navbar-buttons">
        <button
          type="button"
          className="create-transaction-button"
          onClick={() => navigate("/transactions")}
        >
          Create Transaction
        </button>
        <button
          type="button"
          className="pending-transactions-button"
          onClick={() => navigate("/pendingtransactions")}
        >
          Pending Transactions ({pendingCount})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
