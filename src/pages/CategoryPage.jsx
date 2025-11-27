import React, { useState, useEffect } from "react";

const restaurants = [
  {
    id: 1,
    name: "홍대 아웃닭",
    address: "서울 마포구 와우산로17길 19 1층 아웃닭",
    stars: 4.8,
    reviews: 30,
    tags: ["행복해요", "분위기좋음"],
    reviewText: ["맛있어요!", "튀김이 바삭해요!", "재방문 의사 있음"],
    placeId: "22353150",
    image:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200919_244%2F16005035490394UuGt_JPEG%2FGq_DyoWdEpKHdMI9tkvyCZsM.jpeg.jpg",
  },
  {
    id: 2,
    name: "이나닭강정 신촌직영점",
    address: "서울 서대문구 신촌로 57 1층",
    stars: 4.6,
    reviews: 43,
    tags: ["행복해요", "분위기좋음"],
    reviewText: ["양이 많아요!", "달콤하고 맛있음!", "강추합니다!"],
    placeId: "22353150",
    image:
      "https://ldb-phinf.pstatic.net/20250102_190/1735827922045mfwKf_JPEG/KakaoTalk_20250102_232236911.jpg",
  },
];

export default function CategoryPage() {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 좋아요 상태 (리뷰 개수마다 개별 관리)
  const [likes, setLikes] = useState({});

  const toggleLike = (i) => {
    setLikes((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const current = restaurants[index];
  const prev = index > 0 ? restaurants[index - 1] : null;
  const next = index < restaurants.length - 1 ? restaurants[index + 1] : null;

  const goNext = () => {
    if (index < restaurants.length - 1) {
      setIsFlipped(false);
      setIndex(index + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIsFlipped(false);
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key.toLowerCase() === "r") setIsFlipped((prev) => !prev);

      if (e.key === " " || e.key === "Spacebar") {
        window.location.href = `https://place.map.kakao.com/${current.placeId}`;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  return (
    <div className="bg-[#F7F3E7] min-h-screen py-10">

      <div className="mx-auto w-[90%] md:w-[80%] bg-[#E6D2A9] py-10 rounded-3xl text-center shadow-md">
        <div className="text-4xl font-bold text-[#6D5535] mb-3">
          치킨 맛집 추천!
        </div>
        <div className="text-lg text-gray-700">
          감정에 맞는 최적의 맛집을 준비했어요.
        </div>
      </div>

      <div className="relative w-full flex justify-center mt-14">

        {prev && (
          <div className="absolute left-[10%] top-10 w-[300px] opacity-30 blur-sm scale-[0.85]">
            <img src={prev.image} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="bg-white rounded-b-2xl shadow-md p-5">
              <h3 className="font-semibold text-gray-600">{prev.name}</h3>
            </div>
          </div>
        )}

        {/* 메인 카드 */}
        <div className="relative z-10 w-[420px] h-[620px]" style={{ perspective: "1000px" }}>
          <div
            className="w-full h-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >

            {/* 앞면 */}
            <div
              className="absolute w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <img src={current.image} className="w-full h-64 object-cover" />
              <div className="p-6">

                <h2 className="text-2xl font-bold mb-1 text-[#5A4530]">{current.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{current.address}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="text-yellow-500 text-xl">⭐</div>
                  <div className="font-semibold text-[#5A4530]">{current.stars}점</div>
                  <div className="text-gray-500 text-sm">({current.reviews} 리뷰)</div>
                </div>

                <div className="flex gap-2 mb-4">
                  {current.tags.map((t, idx) => (
                    <span key={idx} className="bg-[#F3E6C5] px-3 py-1 rounded-full text-sm text-[#6D5535]">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  className="w-full bg-[#A58963] text-white py-3 rounded-xl mt-2 hover:bg-[#8F744F]"
                  onClick={() => setIsFlipped(true)}
                >
                  리뷰 보기 (R)
                </button>

                <button
                  className="w-full bg-[#C9B89A] text-[#5A4530] py-3 rounded-xl mt-3 hover:bg-[#BCA987]"
                  onClick={() =>
                    (window.location.href = `https://place.map.kakao.com/${current.placeId}`)
                  }
                >
                  상세정보 보기 (Space)
                </button>
              </div>
            </div>

            {/* 뒷면 = 리뷰 + 좋아요 버튼 */}
            <div
              className="absolute w-full h-full bg-white rounded-3xl shadow-xl p-6"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <h2 className="text-2xl font-bold text-[#5A4530] mb-3">리뷰</h2>

              <ul className="text-gray-700 leading-relaxed mb-6">
                {current.reviewText.map((r, i) => (
                  <li key={i} className="flex justify-between items-center mb-2">
                    <span>• {r}</span>

                    {/* 좋아요 버튼 */}
                    <button
                      onClick={() => toggleLike(i)}
                      className="text-xl active:scale-90 transition"
                    >
                      {likes[i] ? "❤️" : "🤍"}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                className="w-full bg-[#A58963] text-white py-3 rounded-xl hover:bg-[#8F744F]"
                onClick={() => setIsFlipped(false)}
              >
                돌아가기
              </button>
            </div>

          </div>
        </div>

        {next && (
          <div className="absolute right-[10%] top-10 w-[300px] opacity-30 blur-sm scale-[0.85]">
            <img src={next.image} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="bg-white rounded-b-2xl shadow-md p-5">
              <h3 className="font-semibold text-gray-600">{next.name}</h3>
            </div>
          </div>
        )}

      </div>

      {/* 이전 / 다음 버튼 */}
      <div className="flex justify-center gap-10 mt-16">
        <button
          onClick={goPrev}
          className="px-6 py-3 text-lg bg-[#E6DCC7] text-[#6D5535] rounded-xl shadow hover:bg-[#D9CDB6]"
        >
          ← 이전
        </button>

        <button
          onClick={goNext}
          className="px-6 py-3 text-lg bg-[#E6DCC7] text-[#6D5535] rounded-xl shadow hover:bg-[#D9CDB6]"
        >
          다음 →
        </button>
      </div>

    </div>
  );
}
