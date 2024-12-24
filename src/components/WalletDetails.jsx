import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the dynamic user ID from the route
import TransactionsTable from "./TransactionsTable";

function WalletDetails() {
  const { id } = useParams(); // Dynamic ID from the URL
  const [transactions, setTransactions] = useState([]); // State for transactions
  const [balance, setBalance] = useState(0); // State for wallet balance
  const [loadingTransactions, setLoadingTransactions] = useState(true); // State for transactions loading
  const [loadingDetails, setLoadingDetails] = useState(true); // State for wallet details loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        // Fetch transactions
        const transactionsResponse = await fetch(
          `http://localhost:8080/api/users/${id}/history` // Dynamic endpoint
        );
        if (!transactionsResponse.ok) {
          throw new Error(
            `Failed to fetch transactions: ${transactionsResponse.status}`
          );
        }
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData); // Set transactions
        setLoadingTransactions(false); // Turn off loading for transactions
      } catch (err) {
        setError(`Transactions Error: ${err.message}`);
        setLoadingTransactions(false);
      }

      try {
        // Fetch balance (float value)
        const walletResponse = await fetch(
          `http://localhost:8080/api/users/${id}/sold` // Dynamic endpoint
        );
        if (!walletResponse.ok) {
          throw new Error(
            `Failed to fetch wallet details: ${walletResponse.status}`
          );
        }
        const walletBalance = await walletResponse.json();
        setBalance(walletBalance); // Set balance from response
        setLoadingDetails(false); // Turn off loading for wallet details
      } catch (err) {
        setError(`Wallet Details Error: ${err.message}`);
        setLoadingDetails(false);
      }
    };

    fetchWalletDetails();
  }, [id]); // Re-run effect if `id` changes

  return (
    <div className="wallet-details-container" style={{ marginTop: "20px" }}>
      <h1 className="wallet-details-title">Wallet Details</h1>

      <div className="wallet-details-info">
        {loadingDetails ? (
          <p>Loading wallet details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <p>
              <strong>Address:</strong> {id}
            </p>
            <p>
              <strong>Balance:</strong>{" "}
              {balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              MC
            </p>
          </>
        )}
      </div>

      <h2>History of Transactions</h2>

      {loadingTransactions ? (
        <p>Loading transaction history...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found for this wallet.</p>
      ) : (
        <TransactionsTable transactions={transactions} />
      )}
    </div>
  );
}

export default WalletDetails;
