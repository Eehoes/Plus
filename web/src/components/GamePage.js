// src/components/GamePage.js
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoBackGameSelectButton from "./RhythmGame/goback_gameselectbutton";
import "./GamePage.css";
import GamePretty from "./RhythmGame/game_pretty";
import GameOnePage from "./RhythmGame/game_onepage";

const GamePage = () => {
  const [pressCount, setPressCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // 음악 재생 관련 옵션
  const [currentTime, setCurrentTime] = useState(0); // 재생된 시간 관련 옵션
  const [duration, setDuration] = useState(0); // 음악 전체 길이 관련 옵션
  const [accuracy, setAccuracy] = useState(null);
  // 아래는 리듬게임 점수 관련 옵션
  const [scoreDetails, setScoreDetails] = useState({
    accuracy: 0,
    score: 0,
    totalNotes: 0,
  }); // 점수 세부 정보 추가
  const audioRef = useRef(null); // 오디오 객체 참조를 위한 useRef 사용
  const navigate = useNavigate();
  const location = useLocation();

  // 선택된 노래 정보를 location 객체에서 가져오는 부분
  const selectedSong = location.state?.song;

  // 음악이 선택되지 않았을 경우 game_select 페이지로 리다이렉트
  // URL 수정하여 강제로 /game 페이지로 가려할 때 작동
  useEffect(() => {
    if (!selectedSong) {
      navigate("/game_select");
    }
  }, [selectedSong, navigate]);

  useEffect(() => {
    if (selectedSong) {
      // 노래 제목 클릭 시 미리듣기
      audioRef.current = new Audio(selectedSong.preview);
    }

    if (audioRef.current) {
      // 오디오 재생 됨 -> 오디오의 전체 재생 길이 가져와서 설정 (얼마나 재생하는지, 아래 Time Bar 관련 등)
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      // 오디오 재생 시간이 변할 때마다 현재 어느정도 재생되었는지를 업데이트
      // 아래 Time Bar 기능으로 쓰임
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
    }

    // 컴포넌트가 언마운트될 때 오디오 객체 중지 및 초기화
    return () => {
      // 오디오 아직 있으면 중지하고 초기화 (= 정보 제거)
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedSong]);

  // 음악 재생 버튼 클릭 시 실행
  const handlePlayClick = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);

        // 음악 재생이 끝남 -> 게임 종료
        audioRef.current.onended = () => {
          handleGameEnd(); // 아래 점수 계산 함수로 이동
        };
      } catch (error) {
        console.error("Audio play error:", error);
      }
    }
  };

  // 게임 종료 후 점수 계산 함수
  const handleGameEnd = (gameResult) => {
    if (gameResult) {
      setScoreDetails(gameResult);
      setAccuracy(gameResult.accuracy);
    } else {
      // 정보 X -> 싹 다 0점 처리
      setScoreDetails({
        accuracy: 0,
        score: 0,
        totalNotes: 0,
        perfectCount: 0,
        goodCount: 0,
        badCount: 0,
      });
    }
    setIsPlaying(false);
  };

  // '결과보기' 버튼 클릭 시 실행
  // const handleResultClick = () => {
  //   navigate("/result", { state: { accuracy, scoreDetails } });
  // };
  // '결과보기' 버튼 클릭 시 실행
  const handleResultClick = () => {
    navigate("/result", {
      state: { scoreDetails },
    });
  };

  /* -------------------------------------------------------------------- */
  // 웹소켓 서버 연결 설정
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3002"); // 3002 포트로 연결

    // 웹소켓이 연결되었을 때
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // 서버에서 메시지를 받을 때 실행
    socket.onmessage = (event) => {
      const count = parseInt(event.data.trim(), 10); // 받은 데이터를 숫자로 변환
      if (!isNaN(count)) {
        setPressCount(count); // 버튼 누름 횟수 업데이트
      } else {
        console.warn("Received invalid data:", event.data); // 디버그용 로그
      }
    };

    // 웹소켓 연결이 종료될 때 실행
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socket.close(); // 컴포넌트가 언마운트될 때 연결 종료
    };
  }, [selectedSong, navigate]);
  /* -------------------------------------------------------------------- */

  // '돌아가기' 버튼 클릭 시 선택된 노래 정보 초기화 & 돌아감
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

      {/* 타임 바 (남은 재생 시간 시각화) */}
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
        <div className="arduino_info">
          <h1>Game Page</h1>
          <h2>Button Press Count: {pressCount}</h2> {/* 버튼 누름 횟수 표시 */}
        </div>

        <GoBackGameSelectButton onResetSelection={resetSelection} />

        <div className="game_component">
          {selectedSong?.title === "예뻤어 - DAY6" && (
            <GamePretty
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onGameEnd={handleGameEnd}
            />
          )}
          {selectedSong?.title === "한페이지가될수있게 - DAY6" && (
            <GameOnePage
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onGameEnd={handleGameEnd}
            />
          )}
        </div>

        <div className="game_controls">
          {/* 추가한 파트: 재생 및 일시정지 버튼 */}
          <button onClick={handlePlayClick} className="play_button">
            재생
          </button>
          {accuracy !== null && (
            <button onClick={handleResultClick} className="result_button">
              결과보기
            </button>
          )}
        </div>

        {/* 정확도 세부 정보 및 최종 점수 */}
        {/* {scoreDetails.accuracy !== null && (
          <div className="gamepage_score_details">
            <h3>Score Details:</h3>
            <p>Accuracy: {scoreDetails.accuracy}%</p>
            <p>Score: {scoreDetails.score}</p>
            <p>Total Notes: {scoreDetails.totalNotes}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GamePage;
