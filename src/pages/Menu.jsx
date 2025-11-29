import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const [mood, setMood] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const location = useLocation();
  const navigate = useNavigate();

  // URL 파라미터 읽기
  const params = new URLSearchParams(location.search);
  const region = params.get("region");

  // ⭐ URL로부터 foodType 읽기
  const initialFoodType = params.get("foodType") || "한식";
  const [foodType, setFoodType] = useState(initialFoodType);

  /** ⭐ URL foodType 변경 감지 → state 업데이트 */
  useEffect(() => {
    const newType = new URLSearchParams(location.search).get("foodType") || "한식";
    setFoodType(newType);
  }, [location.search]);

  /** 🔥 기분 테마 */
  const moodTheme = {
    행복: { bannerBg: "#fff7d6", bannerText: "#7a5c2e", emoji: "😊", title: "행복해요!", desc: "행복한 당신을 위한 최고의 메뉴를 준비했어요!" },
    우울: { bannerBg: "#e3efff", bannerText: "#375c85", emoji: "😢", title: "우울해요...", desc: "당신에게 위로가 될 따뜻한 메뉴예요." },
    스트레스: { bannerBg: "#ffe1e1", bannerText: "#8a3a3a", emoji: "🔥", title: "스트레스 받아요", desc: "기분 전환에 좋은 메뉴를 추천해드릴게요!" },
    피곤: { bannerBg: "#efecff", bannerText: "#4d4b7d", emoji: "😴", title: "피곤해요", desc: "에너지를 채워줄 음식을 가져왔어요!" },
    활기차요: { bannerBg: "#fff0d6", bannerText: "#8a5a2e", emoji: "🌞", title: "활기차요!", desc: "지금의 활기찬 기분을 더 높여줄 음식을 준비했어요!" },
    로맨틱: { bannerBg: "#ffe7f0", bannerText: "#a03a63", emoji: "💖", title: "로맨틱한 기분이에요", desc: "감성 가득한 오늘, 분위기 있는 메뉴를 추천드려요!" },
    편안해요: { bannerBg: "#e8ffef", bannerText: "#357a4d", emoji: "💚", title: "편안해요", desc: "지금의 편안함과 잘 어울리는 따뜻한 메뉴예요." },
    "신나요!": { bannerBg: "#f4e8ff", bannerText: "#7d3dae", emoji: "✨", title: "신나요!", desc: "신나는 당신에게 어울리는 흥겨운 메뉴를 추천해요!" },
    default: { bannerBg: "#fff7d6", bannerText: "#7a5c2e", emoji: "🙂", title: "오늘 기분은 어떠세요?", desc: "취향에 맞는 맛있는 메뉴를 준비했어요." }
  };

  /** 🔥 1) 내 정보 불러오기 */
  const fetchUserData = async () => {
    try {
      const res = await api.get("/api/user/me");
      setMood(res.data.mood);
    } catch (err) {
      console.error("❌ 유저 정보 로딩 실패:", err);
    }
  };

  /** 🔥 2) 추천 메뉴 불러오기 */
  const fetchMenuRecommend = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await api.get("/api/recommend/foods", {
        params: { userId, mood, foodType }
      });

      setMenus(res.data);
    } catch (err) {
      console.error("❌ 메뉴 추천 로딩 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  /** 처음 실행 → 유저 프로필 가져오기 */
  useEffect(() => {
    fetchUserData();
  }, []);

  /** mood나 foodType이 바뀌면 → 메뉴 추천 */
  useEffect(() => {
    if (mood && foodType) {
      setLoading(true);
      fetchMenuRecommend();
    }
  }, [mood, foodType]);

  const theme = moodTheme[mood] || moodTheme.default;

  const goToCategory = (menuName) => {
    navigate(`/category/${encodeURIComponent(menuName)}`);
  };

  return (
    <div className="w-full min-h-screen px-8 py-10" style={{ backgroundColor: "#f9f5ec" }}>
      
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer mb-6 w-fit hover:opacity-70 transition"
        style={{ color: theme.bannerText }}
      >
        <span style={{ fontSize: "22px" }}>←</span>
        <span className="text-lg font-medium">뒤로가기</span>
      </div>

      <div className="p-10 rounded-3xl mb-10 shadow-md" style={{ backgroundColor: theme.bannerBg }}>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: theme.bannerText }}>
          {theme.emoji} {theme.title}
        </h1>
        <p className="mt-2 text-lg" style={{ color: theme.bannerText }}>
          {theme.desc}
        </p>
      </div>

      {!region ? (
        <div className="text-center text-xl text-[#7a5c2e] font-semibold mt-10">
          😊 지역을 먼저 입력해주세요!
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-[#7a5c2e] mb-6">
            🔥 기분 & 취향 기반 추천 메뉴
          </h2>

          {loading ? (
            <p className="text-center text-lg text-gray-600">로딩 중...</p>
          ) : menus.length === 0 ? (
            <p className="text-center text-lg text-gray-600">추천할 메뉴가 없어요 😢</p>
          ) : (
            <>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {menus.slice(0, visibleCount).map((menu, idx) => (
    <div
      key={idx}
      onClick={() => goToCategory(menu.name)}
      className="bg-white p-5 shadow-md rounded-2xl flex flex-col items-center cursor-pointer hover:scale-105 transition"
    >
      {/* 🔥 이미지 추가된 부분 */}
      <img
  src="https://via.placeholder.com/150?text= "
  alt={menu.name}
  className="w-24 h-24 object-cover rounded-xl mb-3"
/>


      <p className="text-[#7a5c2e] text-lg font-semibold">{menu.name}</p>
    </div>
  ))}
</div>


              <div className="flex justify-center mt-10 gap-4">
                {visibleCount < menus.length && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    className="px-6 py-3 bg-[#ffae00] hover:bg-[#e69c00] text-white font-semibold rounded-xl shadow transition active:scale-95"
                  >
                    더 보기
                  </button>
                )}

                {visibleCount > 4 && (
                  <button
                    onClick={() => setVisibleCount(4)}
                    className="px-6 py-3 bg-[#555] hover:bg-[#333] text-white font-semibold rounded-xl shadow transition active:scale-95"
                  >
                    접기
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
