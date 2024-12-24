import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BlockchainBlocks from "../components/BlockonChain";
import TransactionsTable from "../components/TransactionsTable";

const HomePage = () => {
  const [selectedBlock, setSelectedBlock] = useState(null); // State for selected block
  const [blocks, setBlocks] = useState([]); // State for blockchain blocks
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Fetch blocks from the backend
    const fetchBlocks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/blockchain");
        const data = await response.json();
        setBlocks(data.chain); // Set blocks from the response
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching blockchain:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchBlocks();
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <p>Loading blockchain data...</p>
      ) : (
        <BlockchainBlocks
          blocks={blocks}
          onBlockClick={(block) => setSelectedBlock(block)}
        />
      )}

      {selectedBlock ? (
        <TransactionsTable
          blockId={selectedBlock.id}
          transactions={selectedBlock.transactions || []}
        />
      ) : (
        <p style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Ensure it takes up the full height of the parent container
          textAlign: "center", // Center text horizontally
          margin: 0, // Remove any default margins
        }} >Please select a block to view its transactions.</p>
      )}
    </div>
  );
};

export default HomePage;
