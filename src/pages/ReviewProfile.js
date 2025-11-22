import React, { useEffect, useState } from "react";

// restaurantApi가 axios 역할을 대신함
import { api } from "../api/restaurantApi";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();   // ← 이거 없어서 에러난 거야!!


  // ---------------------------
  // API 호출
  // ---------------------------
  useEffect(() => {
    api
      .get("/api/review-profile/1")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 로딩 UI
  if (!data) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        불러오는 중...
      </p>
    );
  }

  // XP 퍼센트 계산
  const xpPercent = Math.min((data.xp / 10000) * 100, 100);

  return (
    <div className="w-full min-h-screen bg-[#faf4e6] flex justify-center py-12 px-6 select-none">

      <div className="w-full max-w-[1100px]">

        {/* ---------------------- 홈으로 ---------------------- */}
        <div className="flex items-center gap-3 mb-10">
          <img src={homeIcon} alt="Home" className="w-8 h-8 object-contain" />
          <span className="text-[20px] font-medium text-[#1a1a1a]">홈으로</span>
        </div>

        {/* ---------------------- 프로필 박스 ---------------------- */}
        <div className="w-full bg-[#fff3c8] rounded-2xl shadow p-8 flex gap-6 items-center">

          <img
            src={profileImg}
            alt="Profile"
            className="w-20 h-20 rounded-full shadow object-contain"
          />

          <div className="flex flex-col w-full">

            {/* 이름 + 레벨 */}
            <div className="flex items-center gap-3">
              <span className="text-[22px] font-semibold text-[#1a1a1a]">
                {data.name}
              </span>

              <span className="bg-[#fe9a00] text-white px-3 py-1 text-sm rounded-full">
                {data.rankName || "Unranked"}
              </span>
            </div>

            <span className="text-[#6c6c6c] text-[15px] mt-1">
              Level {data.level} · {data.xp} / 10,000 XP
            </span>

            {/* XP Bar */}
            <div className="w-full bg-[#f0d8a8] h-2 rounded-full mt-3">
              <div
                className="bg-[#ffa800] h-full rounded-full"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>

            <span className="text-[#e69900] text-[14px] mt-2">
              다음 레벨까지 {10000 - data.xp} XP
            </span>
          </div>
        </div>

        {/* ---------------------- 3개 카드 ---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-lg transition">
            <img src={reviewsIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.reviewCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">작성한 리뷰수</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-lg transition">
            <img src={likesIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.likeCount}</p>
            <p className="text-[#727272] text-[15px] mt-2">받은 좋아요</p>
          </div>

          <div className="bg-white rounded-xl shadow p-8 text-center hover:shadow-lg transition">
            <img src={trustIcon} className="w-16 h-16 mx-auto object-contain" />
            <p className="text-[32px] font-semibold text-[#222] mt-4">{data.trustScore}%</p>
            <p className="text-[#727272] text-[15px] mt-2">신뢰도 점수</p>
          </div>

        </div>

        {/* ---------------------- 내가 간 식당 보기 ---------------------- */}
       {/* ---------------------- 내가 간 식당 보기 ---------------------- */}
    <div className="flex justify-center mt-10">
     <button
       onClick={() => navigate("/review-register")}  // ← 여기 추가!
       className="w-full max-w-[1100px] bg-[#0057ff] hover:bg-[#0048d6] 
               text-white py-4 rounded-xl shadow-lg flex items-center 
               justify-center gap-3 text-[20px] font-medium transition-all"
  >
        <img
         src={restaurantIcon}
         alt="Restaurant"
          className="w-7 h-7 object-contain"
       />
       내가 간 식당 보기
     </button>
    </div>


        {/* ---------------------- 메달 4개 ---------------------- */}
        <div className="bg-white rounded-xl shadow p-6 mt-10">

          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">

            <div className="flex flex-col items-center">
              <img src={medalBronze} className="w-14 h-14 object-contain" />
              <p className="mt-2 text-sm text-[#333]">Bronze</p>
              <p className="text-xs text-gray-400">0–999pt</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={medalSilver} className="w-14 h-14 object-contain" />
              <p className="mt-2 text-sm text-[#333]">Silver</p>
              <p className="text-xs text-gray-400">1K–4.9Kpt</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={medalGold} className="w-16 h-16 object-contain" />
              <p className="mt-2 text-sm font-semibold text-[#333]">Gold</p>
              <p className="text-xs text-gray-400">5K–14.9Kpt</p>
            </div>

            <div className="flex flex-col items-center">
              <img src={medalPlatinum} className="w-14 h-14 object-contain" />
              <p className="mt-2 text-sm text-[#333]">Platinum</p>
              <p className="text-xs text-gray-400">15K+pt</p>
            </div>

          </div>

        </div>

        {/* ---------------------- Gold 등급 박스 ---------------------- */}
        <div className="bg-[#fec000] rounded-xl shadow p-6 mt-10 flex items-center gap-4">
          <img src={medalGold} className="w-11 h-11 object-contain" />
          <div>
            <p className="text-lg font-semibold text-white">{data.rankName} 등급</p>
            <p className="text-sm text-white/90">전문성을 인정받은 상위 리뷰어</p>
          </div>
        </div>

      </div>
    </div>
  );
};
