import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import SelectPage from "./components/SelectPage";
import MyPage from "./components/MyPage";
import PracticePage from "./components/Practice/PracticePage";
import GamePage from "./components/GamePage";
import GameSelectPage from "./components/GameSelectPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 시작 시 열리는 기본 localhost:3000 -> /login 페이지로 이동 */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path="/signup" element={<SignupPage />} />
        {/* 메인페이지 */}
        <Route path="/main" element={<MainPage />} />
        {/* 음악 선택 페이지 ('연습하기' 버튼 클릭 후 열림) */}
        <Route path="/select" element={<SelectPage />} />
        {/* 직전 리듬게임 결과 확인 페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        {/* 연습 페이지 (악보) */}
        <Route path="/practice" element={<PracticePage />} />
        {/* 리듬게임 페이지 */}
        <Route path="/game" element={<GamePage />} />
        {/* 음악 선택 페이지 ('게임하기' 버튼 클릭 후 열림) */}
        <Route path="/game_select" element={<GameSelectPage />} />
        {/* 리듬게임 결과 페이지 */}
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
