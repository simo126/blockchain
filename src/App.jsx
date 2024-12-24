import HomePage from "./page/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TransactionPage from "./page/TransactionPage";

import Wallet from "./page/Wallet";
import PendingTransactions from "./page/PendingTransactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/wallet/:id" element={<Wallet />} />
        <Route path="/pendingtransactions" element={<PendingTransactions />} />
      </Routes>
    </Router>
  );
}

export default App;
