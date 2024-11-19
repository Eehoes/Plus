/* module 불러오기 */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate("");

  // 뒤로가기 버튼 클릭 시
  const handleBack = () => {
    navigate("/main"); // MainPage로 이동
  };

  // 사용자의 게임 결과를 표시하는 예시 데이터
  // 임시 하드코딩 (백엔드와 연동 후 삭제)
  // ...
  const username = "User123";
  const gameScore = "97";

  /* UI 구성 */
  return (
    <div className="mypage">
      <h1 className="mypage_result">
        {username} : {gameScore}
      </h1>
      <button className="mypage_back_button" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
};

export default MyPage;
