import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"; // ✅ axios 대신 api 인스턴스 사용

export default function ReviewRegister() {
  const navigate = useNavigate();
  
  // ✅ 하드코딩된 USER_ID 제거 -> state로 관리
  const [userId, setUserId] = useState(null);

  const [restaurants, setRestaurants] = useState([]);
  const [reviewedRestaurants, setReviewedRestaurants] = useState([]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [visitedDate, setVisitedDate] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  // -------------------------
  // 1) 사용자 ID 가져오기 & 식당 목록 불러오기
  // -------------------------
  useEffect(() => {
    // 1-1. 내 정보 가져오기 (로그인 확인 및 ID 확보)
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user/me");
        setUserId(res.data.id);
      } catch (err) {
        // 401 에러 등은 axiosConfig에서 처리되거나 여기서 처리
        if (err.response && err.response.status === 401) {
            alert("로그인이 필요합니다.");
            navigate("/Login");
        }
      }
    };

    // 1-2. 전체 식당 목록 가져오기 (로그인 여부와 상관없이 가능하다고 가정)
    // (만약 RestaurantController가 없다면 이 부분은 백엔드 구현이 필요합니다)
    const fetchRestaurants = async () => {
        try {
            const res = await api.get("/api/restaurants");
            setRestaurants(res.data);
        } catch (err) {
            console.error("식당 목록 로딩 실패", err);
        }
    };

    fetchUser();
    fetchRestaurants();
  }, [navigate]);

  // -------------------------
  // 2) 사용자가 작성한 리뷰 목록 불러오기 (userId가 설정된 후 실행)
  // -------------------------
  useEffect(() => {
    if (!userId) return; // userId가 없으면 실행하지 않음

    api.get(`/api/reviews/user/${userId}`)
      .then((res) => {
        // 백엔드 ReviewResponse DTO 구조에 맞게 수정
        const restaurantIds = res.data.map((review) => review.restaurantId);
        setReviewedRestaurants(restaurantIds);
      })
      .catch((err) => console.error("리뷰 목록 로딩 실패", err));
  }, [userId]); // userId가 변경(설정)되면 실행됨

  // -------------------------
  // 3) 특정 식당 리뷰 자동 불러오기
  // -------------------------
  const loadExistingReview = (restaurantId) => {
    if (!userId) return;

    api.get(`/api/reviews/user/${userId}/restaurant/${restaurantId}`)
      .then((res) => {
        const review = res.data;

        if (!review) {
          setRating(0);
          setContent("");
          setVisitedDate("");
          return;
        }

        // DTO 구조에 맞게 데이터 매핑
        setRating(review.rating);
        setContent(review.content || "");
        setVisitedDate(review.visitedDate || "");
      })
      .catch((err) => console.error("개별 리뷰 로딩 실패", err));
  };

  // 이미지 미리보기
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const preview = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(preview);
  };

  // 리뷰 저장 핸들러
  const handleSubmit = async () => {
    if (!userId || !selectedRestaurant) return;

    try {
        await api.post("/api/reviews", {
            userId: userId, // 확보한 userId 사용
            restaurantId: selectedRestaurant,
            rating,
            content,
            visitedDate,
        });
        alert("등록되었습니다!");
        navigate("/reviewprofile"); // 등록 후 프로필로 이동 (경로 확인 필요)
    } catch (err) {
        console.error("리뷰 등록 실패", err);
        alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  // -------------------------
  // 리뷰 작성 화면
  // -------------------------
  if (selectedRestaurant !== null) {
    const restaurant = restaurants.find((r) => r.id === selectedRestaurant);

    // restaurant 데이터를 못 찾았을 경우 예외 처리
    if (!restaurant) return <div>식당 정보를 찾을 수 없습니다.</div>;

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              ←
            </button>
            <h1 className="text-xl font-semibold">게시글 등록</h1>
          </div>

          {/* 본문 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {/* 가게명 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">가게명</label>
              <input
                value={restaurant.name}
                className="w-full rounded-xl border border-gray-300 p-3 bg-gray-100"
                readOnly
              />
            </div>

            {/* 방문 날짜 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">방문날짜</label>
              <input
                type="date"
                className="rounded-xl border border-gray-300 p-3"
                value={visitedDate}
                onChange={(e) => setVisitedDate(e.target.value)}
              />
            </div>

            {/* 별점 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">별점</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className="cursor-pointer text-3xl"
                    onClick={() => setRating(n)}
                  >
                    {n <= rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
            </div>

            {/* 내용 */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-3">후기 내용</label>
              <textarea
                className="w-full rounded-xl border border-gray-300 p-3"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* 사진 */}
            <div className="mb-8">
              <label className="block text-gray-600 mb-3">사진 등록</label>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} />

              <div className="grid grid-cols-4 gap-4 mt-3">
                {uploadedImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-24 object-cover rounded-xl border"
                    alt="preview"
                  />
                ))}
              </div>
            </div>

            {/* 저장 */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 bg-orange-500 text-white rounded-xl py-4 hover:bg-orange-600"
                onClick={handleSubmit} // ✅ 분리한 핸들러 사용
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
  // 기본 화면 (식당 목록)
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <div
            className="w-12 h-12 bg-orange-500 rounded-2xl text-white flex items-center justify-center shadow cursor-pointer"
            onClick={() => navigate("/reviewprofile")} // ✅ 프로필 페이지 경로 확인 필요 (/reviewprofile 인지 /ReviewProfile 인지 App.js와 일치해야 함)
          >
            🍽
          </div>
          내가 간 식당
        </h1>

        <div className="space-y-4">
          {restaurants.map((r) => (
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
                  onClick={() => {
                    setSelectedRestaurant(r.id);
                    loadExistingReview(r.id);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 flex items-center gap-2"
                >
                  +
                  {reviewedRestaurants.includes(r.id) ? "리뷰 다시 쓰기" : "리뷰 쓰기"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-orange-500 text-white p-6 rounded-2xl shadow">
          <p className="text-lg font-semibold">계속해서 맛집을 탐험해보세요!</p>
          <p className="opacity-80 text-sm">더 많은 식당을 방문하고 리뷰를 남겨보세요.</p>
        </div>
      </div>
    </div>
  );
}