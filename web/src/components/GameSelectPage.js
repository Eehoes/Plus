import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameSelectPage.css"; // (수정된 부분)
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Firebase Storage

import noSongCover from "../images/no_song_cover.png";
import songPlayerIcon from "../images/song_player.png";

const GameSelectPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [firebaseData, setFirebaseData] = useState({}); // Firebase에서 음원 및 커버 이미지 저장
  const navigate = useNavigate();

  // Firebase에서 음원 및 이미지 URL 불러오기
  useEffect(() => {
    const fetchFirebaseData = async () => {
      const storage = getStorage();
      const data = {};

      // 음원 및 이미지 파일 경로 설정
      const songs = [
        {
          title: "예뻤어 - DAY6",
          audioPath: "DAY6-예뻤어.mp3",
          coverPath: "예뻤어.png",
        },
        {
          title: "한 페이지가 될 수 있게 - DAY6",
          audioPath: "DAY6-한 페이지가 될 수 있게.mp3",
          coverPath: "Page.png",
        },
      ];

      // Firebase에서 음원 및 이미지 URL 가져오기
      for (const song of songs) {
        try {
          const audioRef = ref(storage, song.audioPath);
          const coverRef = ref(storage, song.coverPath);

          const audioUrl = await getDownloadURL(audioRef);
          const coverUrl = await getDownloadURL(coverRef);

          data[song.title] = {
            audio: audioUrl,
            cover: coverUrl,
          };
        } catch (error) {
          console.error(`Error fetching data for ${song.title}:`, error);
        }
      }

      setFirebaseData(data);
    };

    fetchFirebaseData();
  }, []);

  // 미리듣기 시작시간 설정 (초 단위)
  const highlightTimes = {
    "예뻤어 - DAY6": 46.5,
    "한 페이지가 될 수 있게 - DAY6": 57.0,
  };

  // 노래 제목 클릭 시 -> 미리듣기
  const handleSongClick = (songTitle) => {
    const songData = firebaseData[songTitle];

    if (!songData || !songData.audio || !songData.cover) {
      console.error(`Data not available for ${songTitle}`);
      return;
    }

    const previewUrl = songData.audio;

    // 기존 오디오 객체 중지
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // 처음부터 다시 재생
    }

    // 새 오디오 객체 생성
    const newAudio = new Audio(previewUrl);
    newAudio.currentTime = highlightTimes[songTitle] || 0; // 하이라이트 시작 시간 설정
    setAudio(newAudio);
    newAudio.play();

    // 미리듣기 30초 후 정지
    setTimeout(() => {
      newAudio.pause();
    }, 30000);

    setSelectedSong({ title: songTitle, cover: songData.cover }); // 선택된 노래 업데이트
  };

  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  // '게임 시작' 버튼
  const handleStartGame = () => {
    if (selectedSong) {
      navigate("/game", { state: { song: selectedSong } }); // 선택한 노래 정보 전달
    }
  };

  // '메인으로' 버튼
  const handleGoToMain = () => {
    navigate("/main"); // 메인 페이지(/main)로 이동
  };

  /* UI 구성 */
  return (
    <div className="gameselectpage">
      <div className="album_cover">
        {selectedSong ? (
          <div className="selected_song">
            <img src={selectedSong.cover} alt="Album Cover" />
            <h2>{selectedSong.title}</h2>
            <button className="game_start_button" onClick={handleStartGame}>
              시작하기
            </button>
          </div>
        ) : (
          <div className="game_no_song_select">
            <img src={noSongCover} alt="No Song Cover" />
          </div>
        )}
      </div>

      <div className="playlist">
        <h3>PLAYLIST</h3>
        <button
          type="button"
          className="game_listed_song"
          onClick={() => handleSongClick("예뻤어 - DAY6")}
        >
          예뻤어 - DAY6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="game_song_player_icon"
          />
        </button>
        <button
          type="button"
          className="game_listed_song"
          onClick={() => handleSongClick("한 페이지가 될 수 있게 - DAY6")}
        >
          한 페이지가 될 수 있게 - DAY6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="game_song_player_icon"
          />
        </button>
      </div>

      <button
        type="button"
        className="game_select_go_main_button"
        onClick={handleGoToMain}
      >
        메인으로
      </button>
    </div>
  );
};

export default GameSelectPage;
