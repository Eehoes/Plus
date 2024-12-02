import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecentGameScores } from "./firebaseUtils"; // 수정된 함수 가져오기
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [gameScores, setGameScores] = useState([]);
  const userId = "testUser"; // 현재 사용자의 ID (Firebase Auth 연동 시 대체 가능)

  // 뒤로가기 버튼 클릭 시
  const handleBack = () => {
    navigate("/main"); // MainPage로 이동
  };

  // Firebase에서 최근 3개의 게임 결과 불러오기
  useEffect(() => {
    const loadScores = async () => {
      const scores = await fetchRecentGameScores(userId);
      setGameScores(scores);
    };

    loadScores();
  }, [userId]);

  /* UI 구성 */
  return (
    <div className="mypage">
      <h1 className="mypage_title">My Recent Game Results</h1>

      {/* 점수 목록 표시 */}
      <div className="mypage_scores">
        {gameScores.length === 0 ? (
          <p>No game results found.</p>
        ) : (
          <table className="mypage_table">
            <thead>
              <tr>
                <th>Song</th>
                <th>Score</th>
                <th>Accuracy</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {gameScores.map((score) => (
                <tr key={score.id}>
                  <td>{score.song}</td>
                  <td>{score.score}</td>
                  <td>{score.accuracy}%</td>
                  <td>{new Date(score.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button className="mypage_back_button" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
};

export default MyPage;
