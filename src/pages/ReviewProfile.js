import React, { useEffect, useState } from "react";
import { api } from "../api/restaurantApi";
import { useNavigate, useLocation } from "react-router-dom";

// 이미지들
import profileImg from "../images/profile-1.png";
import homeIcon from "../images/home.png";
import reviewsIcon from "../images/reviews.png";
import likesIcon from "../images/likes.png";
import trustIcon from "../images/trust.png";

import medalBronze from "../images/bronze.png";
import medalSilver from "../images/sliver.png";
import medalGold from "../images/gold.png";
import medalPlatinum from "../images/platinum.png";
import restaurantIcon from "../images/restaurant.png";

export const ElementMainScreenHtml = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ 등급별 문구
  const levelMessages = {
    1: "리뷰를 시작한 입문 리뷰어",
    2: "꾸준히 활동하는 숙련 리뷰어",
    3: "신뢰받는 상위 리뷰어",
    4: "전문성을 인정받은 최고 리뷰어"
  };

  useEffect(() => {
    api
      .get("/api/review-profile/1")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [location.key]);

  if (!data) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">불러오는 중...</p>
    );
  }

  // ⭐ 레벨 기반 메달, 이름 자동화
  const levelMedal = {
    1: medalBronze,
    2: medalSilver,
    3: medalGold,
    4: medalPlatinum
  };

  const levelNames = {
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Platinum"
  };

  const xpPercent = Math.min((data.xp / 10000) * 100, 100);
  const nextLevelXp = Math.max(10000 - data.xp, 0);

  return (
    <div className="w-full min-h-screen bg-[#faf4e6] flex justify-center py-12 px-6 select-none">
      <div className="w-full max-w-[1100px]">

        {/* 홈으로 */}
        <div className="flex items-center gap-3 mb-10">
          <img src={homeIcon} alt="Home" className="w-8 h-8 object-contain" />
          <span className="text-[20px] font-medium text-[#1a1a1a]">홈으로</span>
        </div>

        {/* 프로필 박스 */}
        <div className="w-full bg-[#fff3c8] rounded-2xl shadow p-8 flex gap-6 items-center">
          <img
            src={profileImg}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow object-contain"
          />

          <div className="flex flex-col w-full">
            <div className="flex items-center gap-3">
              <span className="text-[22px] font-semibold text-[#1a1a1a]">
                {data.name}
              </span>

              <span className="bg-[#fe9a00] text-white px-3 py-1 text-sm rounded-full">
                {levelNames[data.level]}
              </span>
            </div>

            <span className="text-[#6c6c6c] text-[15px] mt-1">
              Level {data.level} · {data.xp} / 10,000 XP
            </span>

            <div className="w-full bg-[#f0d8a8] h-2 rounded-full mt-3">
              <div
                className="bg-[#ffa800] h-full rounded-full"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>

            <span className="text-[#e69900] text-[14px] mt-2">
              다음 레벨까지 {nextLevelXp} XP
            </span>
          </div>
        </div>

        {/* 3개 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <img src={reviewsIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.reviewCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">작성한 리뷰수</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <img src={likesIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.likeCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">받은 좋아요</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <img src={trustIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.trustScore}%</p>
            <p className="text-[#727272] text-[15px] mt-2">신뢰도 점수</p>
          </div>

        </div>

        {/* 내가 간 식당 보기 */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/review-register", { replace: true })}
            className="w-full max-w-[1100px] bg-[#0057ff] hover:bg-[#0048d6]
              text-white py-4 rounded-xl shadow-lg flex items-center
              justify-center gap-3 text-[20px] font-medium transition-all"
          >
            <img src={restaurantIcon} alt="Restaurant" className="w-7 h-7 object-contain" />
            내가 간 식당 보기
          </button>
        </div>

        {/* 메달 목록 */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">

            {[1, 2, 3, 4].map((level) => (
              <div key={level} className={`${data.level === level ? "opacity-100" : "opacity-40"}`}>
                <img
                  src={levelMedal[level]}
                  className={`object-contain mx-auto ${
                    level === 3 ? "w-16 h-16" : "w-14 h-14"
                  }`}
                />
                <p className="mt-2 text-sm text-[#333]">{levelNames[level]}</p>
              </div>
            ))}

          </div>
        </div>

        {/* 현재 등급 박스 */}
        <div className="bg-[#fec000] rounded-xl shadow p-6 mt-10 flex items-center gap-4">
          <img src={levelMedal[data.level]} className="w-11 h-11 object-contain" />
          <div>
            <p className="text-lg font-semibold text-white">
              {levelNames[data.level]} 등급
            </p>
            <p className="text-sm text-white/90">
              {levelMessages[data.level]}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
