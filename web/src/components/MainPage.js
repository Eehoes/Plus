/* module 불러오기 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Firebase 로그아웃 메서드
import { auth } from "../index"; // index.js에서 Firebase 인증 객체 가져오기
import "./MainPage.css";

const drum_icon =
  "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/drum_icon.png?alt=media";
const MainPage = () => {
  const navigate = useNavigate("");

  // 로그아웃 버튼 클릭 시, Firebase 로그아웃 처리 후 LoginPage로 이동
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // 로그아웃 성공
        console.log("로그아웃 성공");
        navigate("/login"); // 로그인 페이지로 이동
      })
      .catch((error) => {
        // 로그아웃 실패 처리
        console.error("로그아웃 실패:", error);
      });
  };

  // 마이페이지 버튼을 클릭했을 때 마이페이지로 이동
  const handleMyPage = () => {
    navigate("/mypage"); // MyPage로 이동
  };

  // 연습하기 버튼을 클릭했을 때 SelectPage로 이동
  const handlePractice = () => {
    navigate("/select"); // SelectPage로 이동
  };

  // // 게임하기 버튼을 눌렀을 때 GamePage로
  // const handleGame= ()=>{
  //   navigate("/game"); // GamePage로 이동
  // }

  // 게임하기 버튼을 눌렀을 때 GameSelectPage로 이동 (수정된 부분)
  const handleGame = () => {
    navigate("/game_select"); // GameSelectPage로 이동 (수정된 부분)
  };

  /* UI 구성 */
  return (
    <div className="mainpage">
      {/* 드럼 메인 아이콘 & 메인 타이틀 */}
      <div className="main_icon">
        <img src={drum_icon} alt="Main_drum" className="main_icon" />
      </div>
      <h1 className="mainpage_title">야 너두 드럼 칠 수 있어!</h1>

      {/* 메인페이지 버튼 전체 묶음 폼 */}
      <div className="main_button_form">
        <button className="main_practice_button" onClick={handlePractice}>
          연습하기
        </button>

        <button className="main_game_button" onClick={handleGame}>
          게임하기
        </button>
      </div>
      {/* 메인페이지 링크(URL) 전체 묶음 폼 */}
      <div className="mainpage_link_form">
        <p className="mypage_link" onClick={handleMyPage}>
          마이페이지
        </p>
        <p className="logout_link" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  );
};

export default MainPage;
