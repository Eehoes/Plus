// src/components/Practice/PracticePage.js
/* module 불러오기 */
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PracticePage.css";
/* 순서대로 "DAY6-예뻤어.mp3", "DAY6-한 페이지가 될 수 있게.mp3" 악보를 나타내는 코드파일 호출 */
import PrettyMusicBook from "../musicbook/prettymusicbook";
import OnePageMusicBook from "../musicbook/onepagemusicbook";
import GoBackSelectButton from "./goback_selectbutton";

const PracticePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSong = location.state?.song;

  useEffect(() => {
    // 직접 URL을 입력해서 선택된 음악데이터 없이 /practice 페이지로 온다면, 자동으로 /select 페이지로 이동
    if (!selectedSong) {
      navigate("/select");
      return;
    }

    // 오디오 객체 생성 및 설정 (미리듣기 재생)
    const newAudio = new Audio(selectedSong.preview);

    // 오디오 재생 기능 함수
    const playAudio = async () => {
      try {
        await newAudio.play();
        // 음악 재생 시작 -> 커스텀 이벤트 발생
        window.dispatchEvent(new Event("musicStart"));
      } catch (error) {
        console.error("오디오 재생 중 error 발생:", error);
      }
    };

    // 함수 호출 후 재생
    playAudio();

    // 컴포넌트가 사라질 때(= 언마운트) 오디오 정지, 다시 누를 때 또 시작해야 하니 여기서 초기화
    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
    };
  }, [selectedSong, navigate]);

  if (!selectedSong) {
    return null;
  }

  const resetSelection = () => {
    navigate("/select", { replace: true });
  };

  return (
    <div className="practicepage">
      {/* 앨범 커버 이미지 */}
      <div className="album_cover">
        <img src={selectedSong.cover} alt="Album Cover" />
        <h2>{selectedSong.title}</h2>
      </div>

      {/* 악보 표시 */}
      <div className="music_book">
        {selectedSong.title === "예뻤어 - DAY6" ? (
          <PrettyMusicBook />
        ) : (
          <OnePageMusicBook />
        )}
      </div>

      <GoBackSelectButton onResetSelection={resetSelection} />
    </div>
  );
};

export default PracticePage;
