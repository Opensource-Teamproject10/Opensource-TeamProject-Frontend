import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewRegister() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewedRestaurants, setReviewedRestaurants] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  // ⭐ 백엔드 API 호출
  useEffect(() => {
    axios.get("http://localhost:8081/api/restaurants")
      .then((res) => {
        console.log("불러온 식당 목록:", res.data);
        setRestaurants(res.data);
      })
      .catch((err) => console.error(err));
  }, []);



  const categories = [
    "한식", "양식", "중식", "분식", "고기",
    "일식", "카페/디저트", "이자카야", "해산물", "인도요리"
  ];

  // -------------------------
  // SVG ICONS (설치 X)
  // -------------------------
  const SvgArrowLeft = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const SvgStar = ({ filled }) => (
    <svg
      className={`w-8 h-8 cursor-pointer ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049.927l2.237 4.535 5.012.728-3.624 3.532.856 5-4.481-2.357L4.568 15l.856-5-3.624-3.532 5.012-.728L9.049.927z" />
    </svg>
  );

  const SvgPlus = () => (
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );

  const SvgCalendar = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 
               0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  );

  // -------------------------
  // 리뷰 작성 화면
  // -------------------------
  if (selectedRestaurant !== null) {
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const preview = files.map((file) => URL.createObjectURL(file));
      setUploadedImages(preview);
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto p-6">

          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <SvgArrowLeft />
            </button>
            <h1 className="text-xl font-semibold">게시글 등록</h1>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">

            {/* 가게명 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">가게명</label>
              <input
                defaultValue={restaurant.name}
                className="w-full rounded-xl border border-gray-300 p-3"
              />
            </div>

            {/* 카테고리 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">카테고리</label>
              <div className="grid grid-cols-5 gap-3 text-sm">
                {categories.map(c => (
                  <label key={c} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            {/* 방문 날짜 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">방문날짜</label>
              <div className="flex items-center gap-2">
                <SvgCalendar />
                <input type="date" className="rounded-xl border border-gray-300 p-3" />
              </div>
            </div>

            {/* 별점 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">별점</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <div
                    key={n}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                  >
                    <SvgStar filled={n <= (hoverRating || rating)} />
                  </div>
                ))}
              </div>
            </div>

            {/* 사진 등록 */}
            <div className="mb-8">
              <label className="block text-gray-600 mb-3">사진 등록</label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-3"
              />

              <div className="grid grid-cols-4 gap-4">
                {uploadedImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="w-full h-24 object-cover rounded-xl border"
                  />
                ))}

                {[...Array(Math.max(0, 4 - uploadedImages.length))].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50"
                  >
                    <SvgPlus />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="flex-1 bg-orange-500 text-white rounded-xl py-4 hover:bg-orange-600"
                onClick={() => {
                  setReviewedRestaurants([...reviewedRestaurants, restaurant.id]);
                  setSelectedRestaurant(null);
                  setUploadedImages([]);
                }}
              >
                등록
              </button>

              <button
                className="flex-1 border border-orange-500 text-orange-500 rounded-xl py-4 hover:bg-orange-50"
                onClick={() => setSelectedRestaurant(null)}
              >
                취소
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // 기본 화면 (식당 리스트)
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header — 클릭 시 reviewProfile 이동 */}
        <h1 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <div
            className="w-12 h-12 bg-orange-500 rounded-2xl text-white flex items-center justify-center shadow cursor-pointer"
            onClick={() => navigate("/review-profile")}
          >
            🍽
          </div>
          내가 간 식당
        </h1>

        {/* Restaurant List */}
        <div className="space-y-4">
          {restaurants.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow border border-orange-200">

              <div className="flex justify-between items-center">

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{r.name}</h3>

                    {reviewedRestaurants.includes(r.id) && (
                      <span className="bg-green-500 text-white px-3 py-1 text-sm rounded-full">
                        등록 완료!
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600">{r.category}</p>
                  <p className="text-gray-500 text-sm">{r.visited}</p>
                </div>

                <button
                  onClick={() => setSelectedRestaurant(r.id)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 flex items-center gap-2"
                >
                  <SvgPlus />
                  {reviewedRestaurants.includes(r.id) ? "리뷰 다시 쓰기" : "리뷰 쓰기"}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 bg-orange-500 text-white p-6 rounded-2xl shadow">
          <p className="text-lg font-semibold">계속해서 맛집을 탐험해보세요!</p>
          <p className="opacity-80 text-sm">더 많은 식당을 방문하고 리뷰를 남겨보세요.</p>
        </div>

      </div>
    </div>
  );
}
