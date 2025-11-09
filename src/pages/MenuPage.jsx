import React, { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurantApi";
import "../styles/MenuPage.css";

const MenuPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurants("홍대"); // 지역은 필요에 따라 바꿔도 됨
      setRestaurants(data);
    }
    fetchData();
  }, []);

  return (
    <div className="moodfood-page">
      {/* 상단 로고 영역 */}
      <header className="moodfood-header">
        <h1>🍱 무드푸드</h1>
      </header>

      {/* 감정 배너 영역 */}
      <section className="mood-banner">
        <div className="mood-emoji">😊</div>
        <div className="mood-text">
          <h2>행복해요!</h2>
          <p>감정과 프로필 설정에 맞는 더 맛있는 음식들을 준비했어요</p>
        </div>
      </section>

      {/* 맛집 리스트 제목 */}
      <div className="mood-section-title">
        <span>홍대</span> | <span>행복해요 😊</span> |{" "}
        <span>{restaurants.length}개의 맛집</span>
      </div>

      {/* 음식 카드 리스트 */}
      <section className="restaurant-list">
        {restaurants.map((r) => (
          <div key={r.id} className="restaurant-card">
            <div className="restaurant-content">
              <h3>{r.name}</h3>
              <p className="category">{r.category}</p>
              <p className="address">{r.address}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MenuPage;