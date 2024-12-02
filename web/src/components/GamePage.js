import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore import
import { db } from "./firebase"; // Firebase 초기화 파일 가져오기
import GoBackGameSelectButton from "./RhythmGame/goback_gameselectbutton";
import "./GamePage.css";
import GamePretty from "./RhythmGame/game_pretty";
import GameOnePage from "./RhythmGame/game_onepage";

const GamePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [piezoSignal, setPiezoSignal] = useState("");
  const [scoreDetails, setScoreDetails] = useState({
    accuracy: 0,
    score: 0,
    totalNotes: 0,
  });

  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSong = location.state?.song;

  // WebSocket 연결 및 피에조 신호 처리
  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      ws = new WebSocket("ws://localhost:8081");

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const message = event.data.trim();
        setPiezoSignal(message); // 피에조 신호를 상태로 저장
      };

      ws.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        setTimeout(connectWebSocket, 1000); // 1초 후 재연결
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // 음악이 선택되지 않았을 경우 리다이렉트
  useEffect(() => {
    if (!selectedSong) {
      navigate("/game_select");
    }
  }, [selectedSong, navigate]);

  // Firebase에서 노래 URL 가져오기
  useEffect(() => {
    const fetchAudioUrl = async () => {
      if (selectedSong) {
        const storage = getStorage();
        let audioFilePath;

        if (selectedSong.title === "예뻤어 - DAY6") {
          audioFilePath = "DAY6-예뻤어.mp3"; // Firebase 경로
        } else if (selectedSong.title === "한 페이지가 될 수 있게 - DAY6") {
          audioFilePath = "DAY6-한 페이지가 될 수 있게.mp3"; // Firebase 경로
        }

        try {
          const audioRef = ref(storage, audioFilePath);
          const url = await getDownloadURL(audioRef);
          setAudioUrl(url); // 가져온 URL 설정
        } catch (error) {
          console.error("Error fetching audio URL:", error);
        }
      }
    };

    fetchAudioUrl();
  }, [selectedSong]);

  // 게임 종료 처리 함수 (useCallback으로 메모이제이션)
  const handleGameEnd = useCallback((gameResult) => {
    if (gameResult) {
      setScoreDetails(gameResult);
      setAccuracy(gameResult.accuracy);

      // Firebase에 점수 저장
      const saveGameScore = async (userId, songTitle, score, accuracy) => {
        const timestamp = new Date().toISOString();
        try {
          await addDoc(collection(db, "scores"), {
            userId,
            song: songTitle,
            score,
            accuracy,
            timestamp,
          });
          console.log("점수 저장 성공!");
        } catch (error) {
          console.error("점수 저장 중 오류 발생:", error);
        }
      };

      saveGameScore("testUser", selectedSong?.title, gameResult.score, gameResult.accuracy);
    } else {
      setScoreDetails({
        accuracy: 0,
        score: 0,
        totalNotes: 0,
      });
    }
    setIsPlaying(false);
  }, [selectedSong]);

  // 오디오 초기화 및 관리
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);

      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      audioRef.current.onended = () => {
        handleGameEnd();
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, handleGameEnd]);

  const handlePlayClick = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
  };

  const handleResultClick = () => {
    navigate("/result", {
      state: { scoreDetails },
    });
  };

  const resetSelection = () => {
    navigate("/game_select", { replace: true });
  };

  /* UI 구성 */
  return (
    <div className="gamepage">
      <div className="gamepage_left">
        <h2 className="gamepage_songtitle">{selectedSong?.title}</h2>
        <img
          src={selectedSong?.cover}
          alt="Album Cover"
          className="gamepage_albumcover"
        />
      </div>

      <div className="gamepage_timebar_group">
        <p className="gamepage_timebar_title">Time Left</p>
        <div className="gamepage_timebar_background">
          <div
            className="gamepage_timebar_elapsed"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="gamepage_contents">
        <GoBackGameSelectButton onResetSelection={resetSelection} />

        <div className="game_component">
          {selectedSong?.title === "예뻤어 - DAY6" && (
            <GamePretty
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onGameEnd={handleGameEnd}
              piezoSignal={piezoSignal}
            />
          )}
          {selectedSong?.title === "한 페이지가 될 수 있게 - DAY6" && (
            <GameOnePage
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onGameEnd={handleGameEnd}
              piezoSignal={piezoSignal}
            />
          )}
        </div>

        <div className="game_controls">
          <button onClick={handlePlayClick} className="play_button">
            재생
          </button>
          {accuracy !== null && (
            <button onClick={handleResultClick} className="result_button">
              결과보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
