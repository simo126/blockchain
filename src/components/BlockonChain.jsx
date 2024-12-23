import React from "react";

const blocks = [
  {
    id: 1,
    label: "Genesis block",
    hash: "cd1e9d208d0fa58d3e323758f9d59ed4fdc...",
    previousHash: "0",
    nonce: "0",
    timestamp: "1483228800000",
  },
  {
    id: 2,
    label: "",
    hash: "06b5c19b7a152dedfe506c3b4e04c91cd1...",
    previousHash: "cd1e9d208d0fa58d3e323758f9d59ed4fdc...",
    nonce: "33",
    timestamp: "1734897871012",
  },
  {
    id: 3,
    label: "",
    hash: "079c2e90975fac6d4fc4ff4ca5860a56e383...",
    previousHash: "06b5c19b7a152dedfe506c3b4e04c91cd1...",
    nonce: "3",
    timestamp: "1734899363621",
  },
  {
    id: 4,
    label: "",
    hash: "0eba1e8e2b5b20a4c066974ab75431...",
    previousHash: "079c2e90975fac6d4fc4ff4ca5860a56e383...",
    nonce: "17",
    timestamp: "1734899462988",
  },
  {
    id: 5,
    label: "",
    hash: "0eba1e8e2b5b20a4c066974ab75431...",
    previousHash: "079c2e90975fac6d4fc4ff4ca5860a56e383...",
    nonce: "42",
    timestamp: "1734900123456",
  },
];

const BlockchainBlocks = () => {
  return (
    <div className="blockchain-container">
      <h2>Blocks on chain</h2>
      <p>
        Each card represents a block on the chain. Scroll to view all available
        blocks.
      </p>
      <div className="blocks-grid">
        {blocks.map((block) => (
          <div key={block.id} className="block-card">
            <h3>
              Block {block.id} {block.label && <span>({block.label})</span>}
            </h3>
            <p>
              <strong>Hash:</strong> <span className="hash">{block.hash}</span>
            </p>
            <p>
              <strong>Hash of previous block:</strong> {block.previousHash}
            </p>
            <p>
              <strong>Nonce:</strong> {block.nonce}
            </p>
            <p>
              <strong>Timestamp:</strong> {block.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainBlocks;
