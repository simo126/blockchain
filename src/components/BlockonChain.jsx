import React, { useState, useEffect } from "react";

const BlockchainBlocks = ({ onBlockClick }) => {
  const [blocks, setBlocks] = useState([]); // State for blocks
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch blockchain data from backend
    const fetchBlockchain = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/blockchain"); // Backend endpoint
        const data = await response.json(); // Parse JSON response
        setBlocks(data.chain); // Set blocks from the response
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching blockchain:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchBlockchain();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading blocks...</p>; // Show loading message while fetching
  }

  return (
    <div className="blockchain-container">
      <h2>Blocks on chain</h2>
      <p>
        Each card represents a block on the chain. Scroll to view all available
        blocks.
      </p>
      <div className="blocks-grid">
        {blocks.map((block) => (
          <div
            key={block.index} // Use `index` from backend as the unique key
            className="block-card"
            onClick={() => onBlockClick(block)} // Pass clicked block to parent
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3>
              Block {block.index} {block.label && <span>({block.label})</span>}
            </h3>
            <p>
              <strong>Hash:</strong>{" "}
              <span
                className="hash"
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "250px", // Adjust width to prevent overflow
                }}
              >
                {block.hash}
              </span>
            </p>
            <p>
              <strong>Hash of previous block:</strong>{" "}
              <span
                style={{
                  display: "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "250px", // Same style for previous hash
                }}
              >
                {block.previousHash}
              </span>
            </p>
            <p>
              <strong>Nonce:</strong> {block.proof} {/* Adjust for `proof` */}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(block.timestamp).toLocaleString()}{" "}
              {/* Format timestamp */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainBlocks;
