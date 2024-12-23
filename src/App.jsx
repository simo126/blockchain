import BlockchainBlocks from "./components/BlockonChain";
import Navbar from "./components/Navbar";
import TransactionsTable from "./components/TransactionsTable ";

function App() {
  return (
    <>
      <Navbar />
      <BlockchainBlocks />
      <TransactionsTable />
    </>
  );
}

export default App;
