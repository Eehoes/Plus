import React, { useState, useEffect, useCallback } from "react";
import "./game_pretty.css";
import prettyNotes from "./note_pretty";

const GamePretty = ({ isPlaying, onGameEnd }) => {
  const [isAKeyPressed, setIsAKeyPressed] = useState(false);
  const [isSKeyPressed, setIsSKeyPressed] = useState(false);
  const [isDKeyPressed, setIsDKeyPressed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [hitResult, setHitResult] = useState({ a: "", s: "", d: "" });
  const [score, setScore] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [perfectCount, setPerfectCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const targetLineY = 530;
  const bottomLineY = 580;

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

  const handleKeyUp = useCallback((event) => {
    if (event.key === "a") {
      setIsAKeyPressed(false);
    } else if (event.key === "s") {
      setIsSKeyPressed(false);
    } else if (event.key === "d") {
      setIsDKeyPressed(false);
    }
  }, []);

  const checkNoteHit = (position) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => {
        if (note.position === position) {
          const distance = Math.abs(note.y - targetLineY);

          let result = "";
          let points = 0;

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
            return true;
          }

          setHitResult((prev) => ({ ...prev, [position]: result }));
          setScore((prevScore) => prevScore + points);
          setTotalNotes((prevTotal) => prevTotal + 1);

          setTimeout(() => {
            setHitResult((prev) => ({ ...prev, [position]: "" }));
          }, 300);

          return false;
        }
        return true;
      })
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let animationFrame;

    const moveNotes = () => {
      setNotes((prevNotes) =>
        prevNotes
          .map((note) => ({ ...note, y: note.y + 5 }))
          .filter((note) => {
            if (note.y > bottomLineY) {
              setHitResult((prev) => ({ ...prev, [note.position]: "Bad" }));
              setBadCount((prev) => prev + 1);
              setTotalNotes((prevTotal) => prevTotal + 1);

              setTimeout(() => {
                setHitResult((prev) => ({ ...prev, [note.position]: "" }));
              }, 300);

              return false;
            }
            return true;
          })
      );
      animationFrame = requestAnimationFrame(moveNotes);
    };

    if (isPlaying) {
      setNotes([]); // 노트 초기화
      prettyNotes.forEach((note) => {
        setTimeout(() => {
          setNotes((prevNotes) => [
            ...prevNotes,
            { id: Date.now(), position: note.position, y: 0 },
          ]);
        }, note.time * 1000);
      });
      animationFrame = requestAnimationFrame(moveNotes);
    } else {
      cancelAnimationFrame(animationFrame);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying && totalNotes > 0) {
      const maxScore = totalNotes * 10;
      const accuracy = ((score / maxScore) * 100).toFixed(2);

      onGameEnd({
        accuracy,
        score,
        totalNotes,
        perfectCount,
        goodCount,
        badCount,
      });
    }
  }, [isPlaying, totalNotes, score, onGameEnd, perfectCount, goodCount, badCount]);

  // WebSocket 처리 및 피에조 센서 신호에 따른 로직 실행
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = event.data.trim();
      if (message === "CYMBAL") {
        setIsAKeyPressed(true);
        checkNoteHit("a"); // a 로직 실행
        setTimeout(() => setIsAKeyPressed(false), 100);
      } else if (message === "KICK") {
        setIsSKeyPressed(true);
        checkNoteHit("s"); // s 로직 실행
        setTimeout(() => setIsSKeyPressed(false), 100);
      } else if (message === "HIGHTOM") {
        setIsDKeyPressed(true);
        checkNoteHit("d"); // d 로직 실행
        setTimeout(() => setIsDKeyPressed(false), 100);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="game_container">
      <div
        className="square1"
        style={{ backgroundColor: isAKeyPressed ? "#c3b1da" : "#afa1d5" }}
      >
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
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
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
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
        <div
          className="horizontal_line"
          style={{ top: `${targetLineY}px` }}
        ></div>
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
