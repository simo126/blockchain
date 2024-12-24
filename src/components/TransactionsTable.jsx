import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const TransactionsTable = ({ transactions }) => {
  const [hashedTransactions, setHashedTransactions] = useState([]);

  useEffect(() => {
    const hashTransactions = async () => {
      const hashedData = await Promise.all(
        transactions.map(async (transaction) => ({
          ...transaction,
          senderHash: await sha256(transaction.sender.toString()),
          recipientHash: await sha256(transaction.recipient.toString()),
        }))
      );
      setHashedTransactions(hashedData);
    };

    if (transactions.length > 0) {
      hashTransactions();
    }
  }, [transactions]);

  return (
    <div className="transactions-container">
      {transactions.length === 0 ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            margin: 0,
          }}
        >
          No transactions in this block.
        </p>
      ) : (
        <table
          className="transactions-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {hashedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  }}
                >
                  <Link
                    to={`/wallet/${transaction.sender}`}
                    style={{ color: "white" }}
                    title={transaction.sender}
                  >
                    {transaction.senderHash}
                  </Link>
                </td>
                <td
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "200px",
                  }}
                >
                  <Link
                    to={`/wallet/${transaction.recipient}`}
                    style={{ color: "white" }}
                    title={transaction.recipient}
                  >
                    {transaction.recipientHash}
                  </Link>
                </td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
