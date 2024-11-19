import React from "react";
import { useNavigate } from "react-router-dom";
import "./goback_gameselectbutton.css";

const GoBackGameSelectButton = ({ onResetSelection }) => {
  const navigate = useNavigate();

  // '돌아가기' 버튼 기능 함수
  const handleGoBack = () => {
    if (typeof onResetSelection === "function") {
      onResetSelection(); // 선택된 노래 정보 초기화
    }
    navigate("/game_select"); // /game_select 페이지로 이동
  };

  return (
    <button className="goback_button" onClick={handleGoBack}>
      돌아가기
    </button>
  );
};

export default GoBackGameSelectButton;
