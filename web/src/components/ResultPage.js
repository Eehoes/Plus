// src/components/Result/ResultPage.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scoreDetails } = location.state || {
    scoreDetails: { accuracy: 0, score: 0 },
  };

  const handleBackClick = () => {
    navigate("/game_select");
  };

  return (
    <div className="resultpage">
      <h1>게임 결과</h1>
      <h2>정확도: {scoreDetails.accuracy}%</h2>
      {/* 점수를 2로 나누어 표시 */}
      <h2>점수: {Math.floor(scoreDetails.score / 2)}</h2>
      <button onClick={handleBackClick} className="result_back_button">
        게임 음악 선택 페이지로
      </button>
    </div>
  );
};

export default ResultPage;
