import React, { useState, useEffect } from "react"; // useEffect 추가
// import axios from "axios"; // ❌ 삭제 (더 이상 직접 사용하지 않음)
import api from "../api/axiosConfig"; // ✅ 생성해둔 api 인스턴스 사용

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
  const [userName, setUserName] = useState(""); // 사용자 이름 상태 추가

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

  // ✅ 페이지 로드 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/user/me");
        setUserName(response.data.name); // 가져온 이름 설정
      } catch (err) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", err);
        // 필요 시 로그인 페이지로 리다이렉트 등의 처리
      }
    };
    fetchUserData();
  }, []);

  // ✅ 기분과 음식이 모두 선택되었을 때 자동으로 서버에 저장
  // (useEffect를 사용해야 방금 선택한 최신 state값으로 요청을 보낼 수 있습니다)
  useEffect(() => {
    if (selectedMood && selectedFood) {
        trySaveMoodAndFood();
    }
  }, [selectedMood, selectedFood]); // selectedMood나 selectedFood가 바뀔 때마다 실행

  const handleSearch = () => {
    if (!searchValue) {
      alert("지역을 입력하세요!");
      return;
    }
    // (나중에 지역 저장 API가 생기면 여기서 api.post 호출)
    console.log("검색 실행:", searchValue);
    navigate('/Menu');
  };

  const trySaveMoodAndFood = async () => {
    // 선택된 ID를 이용해 라벨(텍스트) 찾기
    const moodLabel = moodOptions.find((m) => m.id === selectedMood)?.label;
    const foodLabel = foodOptions.find((f) => f.id === selectedFood)?.label;

    if (!moodLabel || !foodLabel) return;

    try {
      // ✅ JWT 토큰을 사용하는 api 인스턴스로 변경
      // 1. URL: /api/user/profile (UserController에 정의된 엔드포인트)
      // 2. Payload: DTO 필드명에 맞춰 'mood', 'foodType'으로 전송
      await api.post("/api/user/profile", {
        mood: moodLabel,
        foodType: foodLabel,
        // (참고: 현재 UserController의 /profile은 location을 저장하지 않습니다. 
        // 필요하다면 백엔드 UserProfileDto와 Entity에 location 필드를 추가해야 합니다.)
      });

      console.log(`✅ 저장 완료: ${moodLabel}, ${foodLabel}`);
      
    } catch (err) {
      console.error("❌ 저장 실패", err);
      // 401 에러 등은 api.js 인터셉터나 Login 페이지 리다이렉트로 처리됨
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.id);
    // 여기서 바로 trySave...를 호출하면 안 됩니다 (state 반영 전이라 이전 값이 전송됨)
    // 대신 위의 useEffect가 변화를 감지하고 실행합니다.
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food.id);
  };

  const handleProfile = () => {
    navigate("/review-profile"); // 프로필 페이지로 이동
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
            <div className="text-[#faf5e9]">{userName || "사용자"}님</div>
            <div className="w-8 h-8 border border-[#faf5e9] rounded-full" onClick={handleProfile}></div>
          </div>
        </div>
      </header>

      <div className="flex justify-center mt-10 px-3">
        <div className="w-full max-w-[1100px] space-y-16">

          {/* ✅ 검색 섹션 */}
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