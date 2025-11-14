import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./pages/Login";
import {Profile} from "./pages/Profile";
import Menu from "./pages/Menu";
import { SelectFeel } from "./pages/SelectFeel";
import { ElementMainScreenHtml } from "./pages/ReviewProfile";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/SelectFeel" element={<SelectFeel />} />
        <Route path="/review-profile" element={<ElementMainScreenHtml />} />
      </Routes>
    </Router>
  );
}

export default App;
