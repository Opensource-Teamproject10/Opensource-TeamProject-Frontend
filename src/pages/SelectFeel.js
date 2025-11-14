import React, { useState } from "react";
import axios from "axios";

import image5 from "../images/image-5.png";
import image17 from "../images/image-17.png";
import image18 from "../images/image-18.png";
import image19 from "../images/image-19.png";
import image20 from "../images/image-20.png";
import image1 from "../images/image-1.png";

import vector6 from "../images/vector-6.svg";
import vector7 from "../images/vector-7.svg";
import vector8 from "../images/vector-8.svg";
import vector9 from "../images/vector-9.svg";
import vector10 from "../images/vector-10.svg";
import vector11 from "../images/vector-11.svg";
import vector12 from "../images/vector-12.svg";
import vector13 from "../images/vector-13.svg";
import { Link, useNavigate } from "react-router-dom";

export const SelectFeel = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const moodOptions = [
  { id: 1, label: "행복해요", bgColor: "bg-yellow-100", borderColor: "border-yellow-300", icon: vector6 },
  { id: 2, label: "우울해요", bgColor: "bg-blue-100", borderColor: "border-blue-300", icon: vector7 },
  { id: 3, label: "스트레스", bgColor: "bg-red-100", borderColor: "border-red-300", icon: vector8 },
  { id: 4, label: "피곤해요", bgColor: "bg-gray-100", borderColor: "border-gray-300", icon: vector9 },
  { id: 5, label: "활기차요", bgColor: "bg-orange-100", borderColor: "border-orange-300", icon: vector10 },
  { id: 6, label: "로맨틱", bgColor: "bg-pink-100", borderColor: "border-pink-300", icon: vector11 },
  { id: 7, label: "편안해요", bgColor: "bg-green-100", borderColor: "border-green-300", icon: vector12 },
  { id: 8, label: "신나요!", bgColor: "bg-purple-100", borderColor: "border-purple-300", icon: vector13 },
];

const foodOptions = [
  { id: 1, label: "한식", bgColor: "bg-yellow-100", borderColor: "border-yellow-300", image: image17 },
  { id: 2, label: "중식", bgColor: "bg-pink-100", borderColor: "border-pink-300", image: image18 },
  { id: 3, label: "일식", bgColor: "bg-red-100", borderColor: "border-red-300", image: image19 },
  { id: 4, label: "양식", bgColor: "bg-green-100", borderColor: "border-green-300", image: image20 },
  { id: 5, label: "디저트", bgColor: "bg-yellow-100", borderColor: "border-yellow-300", image: image1 },
];
const handleSearch = () => {
  if (!searchValue) {
    alert("지역을 입력하세요!");
    return;
  }
  navigate('/Menu');
  // axios
  //   .post("http://localhost:8081/api/location", { location: searchValue })
  //   .then(() => {
  //     console.log("✅ 지역 저장 완료:", searchValue);
  //     alert("✅ 입력되었습니다!");   // ✅ 여기 추가
      
  //   })
    
    // .catch((err) => {
    //   console.error("❌ 지역 저장 실패", err);
    //   alert("❌ 저장 실패! 다시 시도해주세요.");
    // });
};

  const trySaveMoodAndFood = () => {
    if (!selectedMood || !selectedFood) return;

    const moodLabel = moodOptions.find((m) => m.id === selectedMood)?.label;
    const foodLabel = foodOptions.find((f) => f.id === selectedFood)?.label;

    axios
      .post("http://localhost:8081/api/mood", {
        feeling: moodLabel,
        food: foodLabel,
        location: searchValue,
      })
      .then(() => console.log(`✅ 저장 완료: ${moodLabel}, ${foodLabel}, ${searchValue}`))
      // .catch((err) => console.error("❌ 저장 실패", err));
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.id);
    trySaveMoodAndFood();
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food.id);
    trySaveMoodAndFood();
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(160deg,rgba(250,245,233,1)_0%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      <header className="w-full h-[69px] flex items-center bg-[#b69f7c] border-b shadow">
        <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center px-5">
          <div className="flex items-center gap-3">
            <img src={image5} alt="logo" className="w-[40px] h-[40px]" />
            <h1 className="text-[#faf5e9] text-2xl font-bold">무드푸드</h1>
          </div>

          <div className="flex gap-6 items-center">
            <button className="text-[#faf5e9]">서비스 흐름</button>
            <div className="text-[#faf5e9]">김민수님</div>
            <div className="w-8 h-8 border border-[#faf5e9] rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex justify-center mt-10 px-3">
        <div className="w-full max-w-[1100px] space-y-16">

          {/* ✅ 검색 버튼: location 저장 */}
          <section className="bg-white border rounded-2xl shadow p-8">
            <h2 className="text-[#b69f7c] text-xl font-bold mb-4">어디서 식사하실 건가요?</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="지역을 검색하세요 (예: 강남, 홍대, 신촌)"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <button
                className="w-[140px] bg-[#b69f7c] text-white rounded-md"
                onClick={handleSearch}
              >
                검색
              </button>
            </div>
          </section>

          {/* ✅ 기분 선택 */}
          <section className="bg-white border rounded-3xl shadow p-10">
            <h2 className="text-center text-[#a78c63] text-2xl font-bold mb-10">
              지금 기분이 어떠세요?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood)}
                  className={`
                    w-full max-w-[220px] h-28 flex flex-col justify-center items-center
                    ${mood.bgColor} ${mood.borderColor} border-2 rounded-xl
                    cursor-pointer hover:scale-105 transition
                    ${selectedMood === mood.id ? "ring-4 ring-offset-2 ring-[#b69f7c]" : ""}
                  `}
                >
                  <img src={mood.icon} className="w-10 h-10 mb-2" alt="" />
                  <span>{mood.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ✅ 음식 선택 */}
          <section className="bg-white border rounded-3xl shadow p-10">
            <h2 className="text-center text-[#a78c63] text-2xl font-bold mb-10">
              어떤 음식이 드시고 싶나요?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
              {foodOptions.map((food) => (
                <button
                  key={food.id}
                  onClick={() => handleFoodSelect(food)}
                  className={`
                    w-full max-w-[200px] h-32 flex flex-col justify-center items-center
                    ${food.bgColor} ${food.borderColor} border-2 rounded-xl
                    cursor-pointer hover:scale-105 transition
                    ${selectedFood === food.id ? "ring-4 ring-offset-2 ring-[#b69f7c]" : ""}
                  `}
                >
                  <img src={food.image} className="w-12 h-12 mb-2" alt="" />
                  <span>{food.label}</span>
                </button>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
