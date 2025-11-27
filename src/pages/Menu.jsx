import React from "react";
import FoodList from "./FoodList";

const Menu = () => {
  return (
    <div className="w-full min-h-screen bg-[#f9f5ec] px-8 py-10">
      
      {/* 배너 영역 */}
      <div className="bg-[#edd8a5] p-10 rounded-3xl mb-10 shadow-md">
        <h1 className="text-3xl font-bold text-[#7a5c2e] flex items-center gap-3">
          😊 행복해요!
        </h1>
        <p className="text-[#7a5c2e] mt-2 text-lg">
          감정과 프로필 설정에 맞는 더 맛있는 음식들을 준비했어요.
        </p>
      </div>

      {/* 음식 메뉴 리스트 */}
      <FoodList />
    </div>
  );
};

export default Menu;