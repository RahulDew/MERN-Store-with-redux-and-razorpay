import "./App.css";
import Home from "./pages/Home";
// import {  }
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
