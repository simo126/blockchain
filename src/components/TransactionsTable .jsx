import React from "react";

const transactions = [
  {
    id: 0,
    from: "System",
    to: "hi",
    amount: 100,
    timestamp: 1734897871012,
    valid: true,
    note: "Block reward",
  },
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
};

const TransactionsTable = ({ blockId }) => {
  return (
    <div className="transactions-container">
      <h2>Transactions inside block {blockId}</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Timestamp</th>
            <th>Valid?</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.from}</td>
              <td>
                <a href="#">{transaction.to}</a>
              </td>
              <td>
                {transaction.amount} <br />
                <small>({transaction.note})</small>
              </td>
              <td>
                {transaction.timestamp}
                <br />
                <small>{formatDate(transaction.timestamp)}</small>
              </td>
              <td>{transaction.valid ? "✔️" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
