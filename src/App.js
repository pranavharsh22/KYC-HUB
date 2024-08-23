import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Compare from "./pages/Compare";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProductDetail />} />
          <Route exact path="/compare" element={<Compare />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
