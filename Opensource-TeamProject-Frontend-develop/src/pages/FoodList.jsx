import React from "react";
import { Link } from "react-router-dom";

const foods = [
  { name: "치킨", img: "/assets/chicken.png", type: "치킨" },
  { name: "피자", img: "/assets/pizza.png", type: "피자" },
  { name: "버거", img: "/assets/burger.png", type: "버거" },
  { name: "한식", img: "/assets/korean.png", type: "한식" },
  { name: "일식", img: "/assets/japanese.png", type: "일식" },
  { name: "중식", img: "/assets/chinese.png", type: "중식" },
  { name: "양식", img: "/assets/western.png", type: "양식" },
  { name: "디저트", img: "/assets/dessert.png", type: "디저트" }
];

const FoodList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {foods.map((food, idx) => (
        <Link
          key={idx}
          to={`/category/${food.type}`}
          className="block"
        >
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col items-center cursor-pointer">
            
            {/* 음식 이미지 */}
            <img
              src={food.img}
              alt={food.name}
              className="w-20 h-20 object-contain mb-3"
            />

            {/* 음식 이름 */}
            <p className="text-lg font-semibold text-gray-800">{food.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FoodList;