// src/components/Practice/goback_selectbutton.js
// goback_selectbutton.js | 2024.10.31 '돌아가기' 버튼 기능 추가
// /practice 페이지에서 연습이 끝난 후 돌아가기 버튼을 통해 /select 페이지로 이동
import React from "react";
import { useNavigate } from "react-router-dom";
import "./goback_selectbutton.css";

const GoBackSelectButton = ({ onResetSelection }) => {
  const navigate = useNavigate();

  // '돌아가기' 버튼 기능 함수
  const handleGoBack = () => {
    if (typeof onResetSelection === "function") {
      onResetSelection(); // 선택된 노래 정보 초기화
    }
    navigate("/select"); // /select 페이지로 이동
  };

  return (
    <button className="goback_button" onClick={handleGoBack}>
      돌아가기
    </button>
  );
};

export default GoBackSelectButton;
