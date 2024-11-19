// src/components/RhythmGame/game_pretty.js
import React, { useState, useEffect, useCallback } from "react";
import "./game_pretty.css";
import prettyNotes from "./note_pretty";

const GamePretty = ({ isPlaying, onGameEnd }) => {
  // a, s, d 키 누름 여부 옵션들 (대문자X)
  const [isAKeyPressed, setIsAKeyPressed] = useState(false);
  const [isSKeyPressed, setIsSKeyPressed] = useState(false);
  const [isDKeyPressed, setIsDKeyPressed] = useState(false);
  // 화면에서 내려오는 채보(= 노트)들 관련 옵션
  const [notes, setNotes] = useState([]);
  // 각 영역 별 클릭 판정 결과 옵션
  const [hitResult, setHitResult] = useState({ a: "", s: "", d: "" });
  // 현재 점수 관련 & 각 판정 별 옵션
  const [score, setScore] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [perfectCount, setPerfectCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  // 아래 가로 판정 기준선 위치 설정
  const targetLineY = 530;
  const bottomLineY = 580;

  // 키보드 키(a, s, d) 눌렀을 때 함수
  const handleKeyDown = useCallback((event) => {
    if (event.key === "a") {
      setIsAKeyPressed(true);
      checkNoteHit("a");
    } else if (event.key === "s") {
      setIsSKeyPressed(true);
      checkNoteHit("s");
    } else if (event.key === "d") {
      setIsDKeyPressed(true);
      checkNoteHit("d");
    }
  }, []);

  // 키보드 키(a, s, d) 뗐을 때 함수
  const handleKeyUp = useCallback((event) => {
    if (event.key === "a") {
      setIsAKeyPressed(false);
    } else if (event.key === "s") {
      setIsSKeyPressed(false);
    } else if (event.key === "d") {
      setIsDKeyPressed(false);
    }
  }, []);

  // 키보드 키로 떨어지는 채보를 눌렀을 때 판정 관련 함수
  // 키 눌렀을 때 어느 영역의 키를 눌렀는지?
  const checkNoteHit = (position) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => {
        // "플레이어가 누른 키의 영역 = 채보가 떨어진 영역" 확인 -> 서로 같아야 함!
        if (note.position === position) {
          // 떨어지는 채보가 기준선인 targetLineY에서 어느정도 거리에 위치해있는지 확인
          // note.y = 현재 떨어지는 채보의 위치
          const distance = Math.abs(note.y - targetLineY);

          // result = 판정 결과 저장
          // points = 해당 판정에 대한 점수 저장
          let result = "";
          let points = 0;

          // 각 채보(노트)가 있던 위치에 따라 점수로 치환 (거리단위 = px)
          //  & 각 판정 개수 맨 위 옵션에 누적 저장
          if (distance <= 20) {
            result = "Perfect";
            points = 10;
            setPerfectCount((prev) => prev + 1);
          } else if (distance <= 50) {
            result = "Good";
            points = 5;
            setGoodCount((prev) => prev + 1);
          } else if (distance <= 100) {
            result = "Bad";
            points = 0;
            setBadCount((prev) => prev + 1);
          } else {
            // 위 셋 다 아님? -> 아직 기준선에 도착하지 않은 경우...아직 너무 위에 있음!
            return true;
          }

          // 채보 맞춤 -> 이전 직전 상태에서 바로 지금 맞춘 걸로 업데이트
          setHitResult((prev) => ({ ...prev, [position]: result }));
          // 기존 직전 점수 + 방금 친 채보 판정 점수
          setScore((prevScore) => prevScore + points);
          // 기존 직전까지 친 채보 개수 + 방금 친 채보 한개
          setTotalNotes((prevTotal) => prevTotal + 1);

          // 일정 시간 후 판정 결과 제거
          // 판정 결과란? 기준선 위에 글씨로 뜨는 perfect, good, bad 글씨 표시 시간을 나타냄
          setTimeout(() => {
            setHitResult((prev) => ({ ...prev, [position]: "" }));
          }, 300);

          return false; // 제대로 키를 누름 -> 노트 제거
        }
        // 아직 기준선에 도착하지 않은 경우...아직 너무 위에 있음!
        return true;
      })
    );
  };

  // 해당 화면(/game)이 시작될 때(= 컴포넌트가 등록됨) & 꺼질 때 작동하는 부분
  useEffect(() => {
    // 키보드 키 눌렀다 뗐다 함수 기능 시작
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // 키보드 키 눌렀다 뗐다 함수 기능 끝 (= 제거)
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let animationFrame;

    // 노트가 기준선을 지나쳤을 때 작동하는 노트 판정 함수
    const moveNotes = () => {
      setNotes((prevNotes) =>
        prevNotes
          // 현재 떨어지는 채보(노트)가 기존 직전 위치 + 5px씩 아래로 이동되게 설정
          .map((note) => ({ ...note, y: note.y + 5 }))
          // 떨어지는 모든 채보들을 보면서 아래 기능들에 해당하는지 판정 (= 기준선 지나쳤는지?)
          .filter((note) => {
            if (note.y > bottomLineY) {
              // 채보 치는 것을 놓침 -> Bad 카운트 1 증가 (총 노트 개수도 1 증가...이는 판정 여부 상관X)
              setHitResult((prev) => ({ ...prev, [note.position]: "Bad" }));
              setBadCount((prev) => prev + 1);
              setTotalNotes((prevTotal) => prevTotal + 1);

              // 일정 시간 후 판정 결과 제거
              setTimeout(() => {
                setHitResult((prev) => ({ ...prev, [note.position]: "" }));
              }, 300);

              // 이제 필요X이니 영역에서 제거
              return false;
            }
            // 아직 기준선에 도착하지 않은 경우...아직 너무 위에 있음!
            return true;
          })
      );
      // 자바스크립트에서 애니메이션처럼 보이게 해줌 -> 리듬게임 채보가 떨어지는 것 구현 가능
      animationFrame = requestAnimationFrame(moveNotes);
    };

    // 게임을 시작할 때 작동하는 부분 (= 노트 초기화해줌)
    if (isPlaying) {
      setNotes([]);
      // note_pretty.js 호출 후 리듬게임 채보 관련 정보(시간, 영역) 전체 확인
      prettyNotes.forEach((note) => {
        setTimeout(() => {
          setNotes((prevNotes) => [
            // 현재 떨어지는 채보들 다음에 이어서 새로운 것이 떨어지게 함
            ...prevNotes,
            { id: Date.now(), position: note.position, y: 0 }, // 새로운 다음 채보가 떨어지는 위치
          ]);
        }, note.time * 1000); // 1000을 곱하여 ms로 단위 변환
      });
      // 채보 내려오기 애니메이션 기능 작동
      animationFrame = requestAnimationFrame(moveNotes);
    } else {
      // 게임 종료할 때는 여기로...
      cancelAnimationFrame(animationFrame);
    }
    // 채보 끝 (게임 종료 = 애니메이션 기능 작동 종료)
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  // 게임 종료 시 결과 계산 및 전송
  useEffect(() => {
    // 음악 재생이 끝남 & 총 친 채보 개수가 0개 초과여야 함 -> 둘 중 하나라도 X라면 0점처리
    if (!isPlaying && totalNotes > 0) {
      const maxScore = totalNotes * 10; // 최대 점수는 총 노트 수 * 10
      const accuracy = ((score / maxScore) * 100).toFixed(2); // 정확도 계산 (소수 둘째자리까지 저장)
      // 아래 onGameEnd 이름으로 GamePage.js에 결과 정보 전송
      onGameEnd({
        accuracy,
        score,
        totalNotes,
        perfectCount,
        goodCount,
        badCount,
      });
    }
  }, [
    isPlaying,
    totalNotes,
    score,
    onGameEnd,
    perfectCount,
    goodCount,
    badCount,
  ]); // 대괄호? 이 배열의 값이 하나라도 바뀌면 바로 다시 시작 (의존성 배열)

  /* UI 구성 */
  return (
    <div className="game_container">
      <div
        className="square1"
        style={{ backgroundColor: isAKeyPressed ? "#c3b1da" : "#afa1d5" }}
      >
        {/* 기준선 */}
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
        {/* 판정 결과 표시 */}
        {hitResult.a && (
          <div className="hit_result" style={{ top: `${targetLineY - 30}px` }}>
            {hitResult.a}
          </div>
        )}
        {notes
          .filter((note) => note.position === "a")
          .map((note) => (
            <div
              key={note.id}
              className="note_a"
              style={{ top: `${note.y}px` }}
            ></div>
          ))}
      </div>
      <div
        className="square2"
        style={{ backgroundColor: isSKeyPressed ? "#ad9cc3" : "#a287b9" }}
      >
        {/* 기준선 */}
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
        {/* 판정 결과 표시 */}
        {hitResult.s && (
          <div className="hit_result" style={{ top: `${targetLineY - 30}px` }}>
            {hitResult.s}
          </div>
        )}
        {notes
          .filter((note) => note.position === "s")
          .map((note) => (
            <div
              key={note.id}
              className="note_s"
              style={{ top: `${note.y}px` }}
            ></div>
          ))}
      </div>
      <div
        className="square3"
        style={{ backgroundColor: isDKeyPressed ? "#dabfdc" : "#c0abc8" }}
      >
        {/* 기준선 */}
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
        {/* 판정 결과 표시 */}
        {hitResult.d && (
          <div className="hit_result" style={{ top: `${targetLineY - 30}px` }}>
            {hitResult.d}
          </div>
        )}
        {notes
          .filter((note) => note.position === "d")
          .map((note) => (
            <div
              key={note.id}
              className="note_d"
              style={{ top: `${note.y}px` }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default GamePretty;
