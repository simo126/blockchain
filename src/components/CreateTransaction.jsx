import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTransaction() {
  const [toAddress, setToAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the transaction payload
    const transaction = {
      sender: fromAddress, // Replace with the actual sender logic if needed
      recipient: toAddress,
      amount: parseFloat(amount),
    };

    try {
      // POST the transaction to the API
      const response = await fetch("http://localhost:8080/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error(`Failed to create transaction: ${response.status}`);
      }

      alert("Transaction created successfully!");

      // Redirect to pending transactions page
      navigate("/pendingtransactions");
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Create Transaction</h1>
      <p>Transfer some money to someone!</p>

      <form onSubmit={handleSubmit}>
        {/* From Address */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="fromAddress"
            style={{ display: "block", fontWeight: "bold" }}
          >
            From address
          </label>
          <input
            id="fromAddress"
            type="text"
            value={fromAddress}
            placeholder="Enter the sender's address"
            onChange={(e) => setFromAddress(e.target.value)}
            
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* To Address */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="toAddress"
            style={{ display: "block", fontWeight: "bold" }}
          >
            To address
          </label>
          <input
            id="toAddress"
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="Enter the recipient's address"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <small style={{ color: "#666" }}>
            The address of the wallet where you want to send the money to.
          </small>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="amount"
            style={{ display: "block", fontWeight: "bold" }}
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter the amount to send"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              marginTop: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <small style={{ color: "#666" }}>
            You can transfer any amount. Account balance is not checked in this
            demo.
          </small>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            background: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Transaction
        </button>
      </form>
    </div>
  );
}

export default CreateTransaction;
