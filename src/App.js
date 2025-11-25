import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import Menu from "./pages/Menu";
import { SelectFeel } from "./pages/SelectFeel";
import { ElementMainScreenHtml } from "./pages/ReviewProfile";
import ReviewRegister from "./pages/ReviewRegister";   // ⭐ 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/SelectFeel" element={<SelectFeel />} />
        <Route path="/review-profile" element={<ElementMainScreenHtml />} />
        
        {/* ⭐ 새 페이지 라우팅 추가 */}
        <Route path="/review-register" element={<ReviewRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
