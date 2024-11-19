/* module 불러오기 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase 인증 관련 메서드
import { auth } from "../index"; // index.js에서 Firebase 인증 객체 가져오기
import "./LoginPage.css";

const LoginPage = () => {
  // 입력된 아이디와 비밀번호를 저장할 상태 변수
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태

  const navigate = useNavigate("");

  // 로그인 버튼 클릭 시 Firebase 로그인 처리
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // 로그인 성공
        console.log("로그인 성공:", userCredential.user);
        navigate("/main"); // 로그인 성공 시 메인 페이지로 이동
      })
      .catch((error) => {
        // 로그인 실패
        console.error("로그인 실패:", error);
        if (error.code === "auth/wrong-password") {
          setErrorMessage("비밀번호가 올바르지 않습니다.");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("해당 이메일로 등록된 사용자를 찾을 수 없습니다.");
        } else {
          setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      });
  };

  return (
    <div className="loginpage">
      {/* 로그인 폼 */}
      <h1 className="loginpage_title">로그인</h1>
      <div className="login_form">
        {/* 아이디 입력 폼 */}
        <div className="login_label_input">
          <div className="input_id">
            <label htmlFor="username" className="login_label">
              아이디
            </label>
            <input
              type="email"
              id="username"
              className="input_field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 폼 */}
          <div className="input_password">
            <label htmlFor="password" className="login_label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="input_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 로그인 시도 버튼 */}
        <button type="submit" className="login_button" onClick={handleLogin}>
          Login
        </button>

        {/* 로그인 실패 시 에러 메시지 */}
        {errorMessage && <p className="login_error">{errorMessage}</p>}
      </div>

      {/* 회원가입으로 이동 버튼 */}
      <div>
        <button
          className="go_signup_button"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
