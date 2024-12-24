import React, { useState, useEffect } from "react";
import TransactionsTable from "../components/TransactionsTable";
import Navbar from "../components/Navbar";

const PendingTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]); // State for pending transactions
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const [miningMessage, setMiningMessage] = useState(""); // State for mining response message

  useEffect(() => {
    // Fetch pending transactions from the backend
    const fetchPendingTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transactions");
        if (!response.ok) {
          throw new Error(`Failed to fetch transactions: ${response.status}`);
        }
        const data = await response.json();
        setPendingTransactions(data); // Set transactions
        setLoading(false); // Turn off loading
      } catch (err) {
        setError(err.message);
        setLoading(false); // Turn off loading even on error
      }
    };

    fetchPendingTransactions();
  }, []); // Run only once when the component mounts

  const handleMineBlock = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/mining", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Mining failed: ${response.status}`);
      }

      const result = await response.json();
      setMiningMessage("Block mined successfully!");
      console.log("Mining result:", result);

      // Optionally refetch pending transactions after mining
      setLoading(true);
      const transactionsResponse = await fetch(
        "http://localhost:8080/api/transactions"
      );
      const transactionsData = await transactionsResponse.json();
      setPendingTransactions(transactionsData);
      setLoading(false);
    } catch (err) {
      setMiningMessage(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="pending-transactions-container"
        style={{ margin: "20px" }}
      >
        <h1 style={{ textAlign: "center" }}>Pending Transactions</h1>

        {loading ? (
          <p>Loading pending transactions...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TransactionsTable transactions={pendingTransactions} />
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleMineBlock}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Mine Block
          </button>
        </div>

        {miningMessage && (
          <p
            style={{ textAlign: "center", color: "#28a745", marginTop: "10px" }}
          >
            {miningMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default PendingTransactions;
