// src/components/Practice/PracticePage.js
/* module 불러오기 */
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PracticePage.css";
import PrettyMusicBook from "../musicbook/prettymusicbook";
import OnePageMusicBook from "../musicbook/onepagemusicbook";
import GoBackSelectButton from "./goback_selectbutton";

/* Firebase에 저장된 이미지 및 음원 URL */
const page_img = "https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/Page.png?alt=media";
const page_mp3 ="https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/DAY6-%ED%95%9C%20%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%80%20%EB%90%A0%20%EC%88%98%20%EC%9E%88%EA%B2%8C.mp3?alt=media";
const purple_img="https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/%EC%98%88%EB%BB%A4%EC%96%B4.png?alt=media";
const purple_mp3="https://firebasestorage.googleapis.com/v0/b/capstone-8763b.appspot.com/o/DAY6-%EC%98%88%EB%BB%A4%EC%96%B4.mp3?alt=media";

const PracticePage = () => {
  // 현재 페이지(/practice)에 위치 정보와 탐색 기능 추가
  const location = useLocation();
  const navigate = useNavigate();
  // 선택된 노래 정보를 location 객체에서 가져오는 부분
  const selectedSong = location.state?.song;

  useEffect(() => {
    // URL로 직접 접근할 경우 선택된 음악 데이터가 없다면 /select로 이동
    if (!selectedSong) {
      navigate("/select");
      return;
    }

    // 페이지 이동 시 자동으로 미리듣기 재생을 방지
    const newAudio = new Audio(selectedSong.preview);
    
    // 오디오 객체를 생성했으나 play()는 호출하지 않음

    return () => {
      newAudio.pause();
      newAudio.currentTime = 0; // 오디오 정지 후 처음부터 다시 시작
    };
  }, [selectedSong, navigate]);

  // 선택된 노래가 없으면 페이지 자체를 렌더링하지 않음
  if (!selectedSong) {
    return null;
  }

  // '돌아가기' 버튼 클릭 시 선택된 노래 정보 초기화 & 돌아감
  const resetSelection = () => {
    navigate("/select", { replace: true });
  };

  return (
    <div className="practicepage">
      {/* 앨범 커버 이미지 */}
      <div className="album_cover">
        {/* Firebase URL로 cover 이미지 설정 */}
        <img src={selectedSong.title === "예뻤어 - DAY6" ? purple_img : page_img} alt="Album Cover" />
        {/* 해당 곡 제목 */}
        <h2>{selectedSong.title}</h2>
      </div>

      {/* 악보 표시 */}
      <div className="music_book">
        {(() => {
          if (selectedSong.title === "예뻤어 - DAY6") {
            return <PrettyMusicBook audioUrl={purple_mp3} />;
          } else if (selectedSong.title === "한페이지가될수있게 - DAY6") {
            return <OnePageMusicBook audioUrl={page_mp3} />;
          } else {
            return null;
          }
        })()}
      </div>
      <GoBackSelectButton onResetSelection={resetSelection} />
    </div>
  );
};

export default PracticePage;
