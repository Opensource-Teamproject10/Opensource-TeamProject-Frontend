import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig"; // 설정된 axios 인스턴스 (JWT 토큰 자동 포함)
import { useNavigate, useLocation } from "react-router-dom";

// 이미지들 (경로는 프로젝트 구조에 맞게 확인 필요)
import profileImg from "../images/profile-1.png";
import homeIcon from "../images/Home.png";
import reviewsIcon from "../images/reviews.png";
import likesIcon from "../images/likes.png";
import trustIcon from "../images/trust.png";

import medalBronze from "../images/bronze.png";
import medalSilver from "../images/sliver.png";
import medalGold from "../images/gold.png";
import medalPlatinum from "../images/platinum.png";
import restaurantIcon from "../images/restaurant.png";

export const ReviewProfile = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ 등급별 문구 (하단 박스 표시용)
  const levelMessages = {
    1: "리뷰를 시작한 입문 리뷰어",
    2: "꾸준히 활동하는 숙련 리뷰어",
    3: "신뢰받는 상위 리뷰어",
    4: "전문성을 인정받은 최고 리뷰어",
    0: "아직 활동이 없는 새내기"
  };

  // ⭐ 레벨 번호에 따른 메달 이미지 매핑
  const levelMedal = {
    1: medalBronze,
    2: medalSilver,
    3: medalGold,
    4: medalPlatinum
  };

  // ⭐ 하단 메달 목록에 표시할 정적 텍스트 (User 데이터와 무관하게 고정)
  const staticLevelNames = {
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Platinum"
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 1단계: 내 정보(ID)를 먼저 가져옵니다. (JWT 토큰 사용)
        const userRes = await api.get("/api/user/me");
        const userId = userRes.data.id;

        // 2단계: 획득한 ID를 사용하여 리뷰 프로필 데이터를 조회합니다.
        const profileRes = await api.get(`/api/review-profile/${userId}`);
        
        setData(profileRes.data);

      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        // 인증 실패(401) 시 로그인 페이지로 이동
        if (err.response && err.response.status === 401) {
            alert("로그인이 필요합니다.");
            navigate("/Login");
        }
      }
    };

    fetchProfileData();
  }, [location.key, navigate]);

  // 데이터 로딩 중 표시
  if (!data) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">프로필을 불러오는 중입니다...</p>
    );
  }

  // XP 진행률 계산 (최대 경험치 10000 기준 예시)
  const xpPercent = Math.min((data.xp / 10000) * 100, 100);
  const nextLevelXp = Math.max(10000 - data.xp, 0);

  // 현재 레벨에 해당하는 메달 이미지 (범위 벗어나면 Bronze 기본값)
  const currentMedalImage = levelMedal[data.level] || medalBronze;

  return (
    <div className="w-full min-h-screen bg-[#faf4e6] flex justify-center py-12 px-6 select-none">
      <div className="w-full max-w-[1100px]">

        {/* 홈으로 버튼 */}
        <div 
          className="flex items-center gap-3 mb-10 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => navigate("/SelectFeel")}
        >
          <img src={homeIcon} alt="Home" className="w-8 h-8 object-contain" />
          <span className="text-[20px] font-medium text-[#1a1a1a]">홈으로</span>
        </div>

        {/* 상단 프로필 정보 박스 */}
        <div className="w-full bg-[#fff3c8] rounded-2xl shadow p-8 flex flex-col md:flex-row gap-6 items-center">
          <img
            src={profileImg}
            alt="Profile"
            className="w-24 h-24 md:w-20 md:h-20 rounded-full shadow object-contain bg-white"
          />

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-3 mb-1">
              {/* 사용자 이름 */}
              <span className="text-[22px] font-semibold text-[#1a1a1a]">
                {data.name}
              </span>

              {/* 랭크 이름 (백엔드에서 받은 rankName 사용) */}
              <span className="bg-[#fe9a00] text-white px-3 py-1 text-sm rounded-full font-medium">
                {data.rankName}
              </span>
            </div>

            <span className="text-[#6c6c6c] text-[15px] mt-1">
              Level {data.level} · {data.xp} / 10,000 XP
            </span>

            {/* XP 진행바 */}
            <div className="w-full bg-[#f0d8a8] h-3 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#ffa800] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>

            <span className="text-[#e69900] text-[14px] mt-2 text-right md:text-left">
              다음 레벨까지 {nextLevelXp} XP
            </span>
          </div>
        </div>

        {/* 통계 카드 3개 (리뷰수, 좋아요, 신뢰도) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          {/* 리뷰 수 */}
          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-md transition-shadow">
            <img src={reviewsIcon} className="w-16 h-16 mx-auto object-contain" alt="reviews" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.reviewCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">작성한 리뷰수</p>
          </div>

          {/* 좋아요 수 */}
          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-md transition-shadow">
            <img src={likesIcon} className="w-16 h-16 mx-auto object-contain" alt="likes" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.likeCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">받은 좋아요</p>
          </div>

          {/* 신뢰도 점수 */}
          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-md transition-shadow">
            <img src={trustIcon} className="w-16 h-16 mx-auto object-contain" alt="trust" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.trustScore}%</p>
            <p className="text-[#727272] text-[15px] mt-2">신뢰도 점수</p>
          </div>

        </div>

        {/* 내가 간 식당 보기 버튼 */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/review-register", { replace: true })}
            className="w-full max-w-[1100px] bg-[#0057ff] hover:bg-[#0048d6]
              text-white py-4 rounded-xl shadow-lg flex items-center
              justify-center gap-3 text-[20px] font-medium transition-all active:scale-95"
          >
            <img src={restaurantIcon} alt="Restaurant" className="w-7 h-7 object-contain" />
            내가 간 식당 보기
          </button>
        </div>

        {/* 하단 메달 목록 (정적 표시) */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            {[1, 2, 3, 4].map((level) => (
              <div 
                key={level} 
                className={`transition-opacity duration-300 ${data.level === level ? "opacity-100 scale-110" : "opacity-40 grayscale"}`}
              >
                <img
                  src={levelMedal[level]}
                  className={`object-contain mx-auto ${
                    level === 3 ? "w-16 h-16" : "w-14 h-14"
                  }`}
                  alt={`medal-${level}`}
                />
                <p className="mt-2 text-sm text-[#333] font-medium">{staticLevelNames[level]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 현재 등급 요약 박스 */}
        <div className="bg-[#fec000] rounded-xl shadow p-6 mt-10 flex items-center gap-4">
          <img src={currentMedalImage} className="w-12 h-12 object-contain" alt="current-medal" />
          <div>
            <p className="text-lg font-bold text-white">
              {data.rankName} 등급
            </p>
            <p className="text-sm text-white/90 font-medium">
              {levelMessages[data.level] || "활동을 시작해보세요!"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};