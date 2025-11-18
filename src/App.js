import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Menu from "./pages/Menu";
import { SelectFeel } from "./pages/SelectFeel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/SelectFeel" element={<SelectFeel />} />
      </Routes>
    </Router>
  );
}

export default App;
