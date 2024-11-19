// src/components/musicbook/prettymusicbook.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import noMusicImage from "../musicbook/no_musicbook.png";
import pretty_Image1 from "../musicbook/DAY6_pretty_1.png";
import pretty_Image2 from "../musicbook/DAY6_pretty_2.png";
import pretty_Image3 from "../musicbook/DAY6_pretty_3.png";
import pretty_Image4 from "../musicbook/DAY6_pretty_4.png";
import pretty_Image5 from "../musicbook/DAY6_pretty_5.png";
import pretty_Image6 from "../musicbook/DAY6_pretty_6.png";
import pretty_Image7 from "../musicbook/DAY6_pretty_7.png";
import pretty_Image8 from "../musicbook/DAY6_pretty_8.png";
import pretty_Image9 from "../musicbook/DAY6_pretty_9.png";
import "./prettymusicbook.css";

const PrettyMusicBook = () => {
  // 현재 보여지는 악보 이미지 관리, 기본값은 noMusicImage로 설정
  const [currentScoreImage, setCurrentScoreImage] = useState(noMusicImage);
  // 현재 강조된 마디 관리
  const [highlightedMeasure, setHighlightedMeasure] = useState(null);
  // timers 값을 저장
  const timers = useRef([]);
  const musicStartTime = useRef(null); // 음악 시작 시점을 기록

  // 음악이 시작되었을 때 실행되는 함수 (악보 이미지와 마디 강조 타이머 설정)
  const handleMusicStart = useCallback(() => {
    // 음악이 실제로 시작된 시점을 기록
    musicStartTime.current = Date.now(); // 음악 시작 시간 기록

    // 악보 이미지를 변경하는 시간 설정
    const changeScoreImage = [
      { time: 0, image: pretty_Image1 },
      { time: 11850, image: pretty_Image2 },
      { time: 23710, image: pretty_Image3 },
      { time: 34090, image: pretty_Image4 },
      { time: 45970, image: pretty_Image5 },
      { time: 57030, image: pretty_Image6 },
      { time: 68760, image: pretty_Image7 },
      { time: 79420, image: pretty_Image8 },
      { time: 91040, image: pretty_Image9 },
    ];

    // 강조 마디 위치를 변경하는 시간 설정
    const highlightTiming = [
      /* ---------------------------------------------------- */
      /* page1 */
      { time: 0, measure: 1 },
      { time: 2990, measure: 2 },
      { time: 5850, measure: 3 },
      { time: 8970, measure: 4 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page2 */
      { time: 11850, measure: 5 },
      { time: 14810, measure: 6 },
      { time: 17840, measure: 7 },
      { time: 20580, measure: 8 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page3 */
      { time: 23710, measure: 9 },
      { time: 26240, measure: 10 },
      { time: 29090, measure: 11 },
      { time: 31860, measure: 12 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page4 */
      { time: 34090, measure: 13 },
      { time: 37100, measure: 14 },
      { time: 40100, measure: 15 },
      { time: 43100, measure: 16 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page5 */
      { time: 45970, measure: 17 },
      { time: 48500, measure: 18 },
      { time: 51500, measure: 19 },
      { time: 54500, measure: 20 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page6 */
      { time: 57030, measure: 21 },
      { time: 59700, measure: 22 },
      { time: 62600, measure: 23 },
      { time: 65300, measure: 24 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page7 */
      { time: 68760, measure: 25 },
      { time: 70700, measure: 26 },
      { time: 73700, measure: 27 },
      { time: 76300, measure: 28 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page8 */
      { time: 79420, measure: 29 },
      { time: 82100, measure: 30 },
      { time: 85200, measure: 31 },
      { time: 88100, measure: 32 },
      /* ---------------------------------------------------- */

      /* ---------------------------------------------------- */
      /* page9 */
      { time: 91040, measure: 33 },
      { time: 94100, measure: 34 },
      { time: 97100, measure: 35 },
      { time: 100100, measure: 36 },
      /* ---------------------------------------------------- */
    ];

    // 악보 이미지 변경 타이머 설정
    /*
    time = 악보 이미지나 마디 강조가 이루어져야 하는 목표 시간
    (Date.now() - musicStartTime.current) 코드부분
     musicStartTime.current = 음악이 실제로 재생된 시점
     Date.now() = 현재 시간
      -> 음악이 재생된 후 경과된 시간을 계산
    */
    changeScoreImage.forEach(({ time, image }) => {
      // 현재 시간에서 악보 띄우기를 시작할 delay 계산 (웹페이지 딜레이 여부 확인)
      /*
      time = 원래 떨어져야 하는 시간 (= 위에 적은 정상 시간들)
      delay = 최종 지연된 시간
      Date.now() = 지금 시간
      musicStartTime.current = 웹페이지 딜레이 후 음악 재생이 시작된 시간
      */
      /*
      ex) 웹페이지 지연 시간이 3초라면?
          현재 시간은 20초
          음악 시작 10초 시점
          4초 후에 떨어져야 하는 채보 실제 시간 계산
            -> 4000 - (20000 - 10000) = -6000
            즉 기존에 떨어져야 하는 시간대에서 6초 늦게 떨어짐!
            음악이 10초에 시작되었고, 4초 뒤에 떨어지는 것이 딜레이로 20초에 떨굼
      */
      const delay = time - (Date.now() - musicStartTime.current);
      const timer = setTimeout(
        () => setCurrentScoreImage(image),
        Math.max(0, delay)
      );
      timers.current.push(timer);
    });

    // 강조 마디 위치 변경 타이머 설정
    highlightTiming.forEach(({ time, measure }) => {
      // 현재 시간에서 강조 박스를 시작할 delay 계산 (웹페이지 딜레이 여부 확인)
      const delay = time - (Date.now() - musicStartTime.current);
      const timer = setTimeout(
        () => setHighlightedMeasure(measure),
        Math.max(0, delay)
      );
      timers.current.push(timer);
    });
  }, []);

  // 컴포넌트가 처음 렌더링될 때 음악 시작 이벤트를 감지하고, 타이머 설정
  useEffect(() => {
    // "musicStart" 이벤트를 수신하여 handleMusicStart 실행
    window.addEventListener("musicStart", handleMusicStart); // 이벤트 리스너 추가

    // 컴포넌트 언마운트 시 타이머 정리
    // 클린업 함수에서 안전하게 접근하려면? -> 로컬 변수로 사용
    //  = 현재 시간(timers)가 얼마인지를 저장한다는 뜻
    //  why? 컴포넌트 리랜더링 여부를 주의하기 위해...
    const savedTimers = timers.current; // 현재 타이머 배열을 복사

    return () => {
      // 'musicstart' 커스텀 이벤트 발생 여부 확인하고 기능(handleMusicStart 함수) 시작
      window.removeEventListener("musicStart", handleMusicStart); // 이벤트 리스너 제거 (컴포넌트가 언마운트 될 때)
      savedTimers.forEach(clearTimeout); // 설정된 모든 타이머 제거
    };
  }, [handleMusicStart]);

  return (
    <div className="musicbook">
      <div className="imagebox_field">
        {/* 현재 악보 이미지 표시 */}
        <img
          src={currentScoreImage}
          alt="Score Sheet"
          className="sheet_image"
        />
        {/* 강조 마디(red_box) 표시 */}
        {highlightedMeasure && (
          <div className={`red_box measure-${highlightedMeasure}`}></div>
        )}
      </div>
    </div>
  );
};

export default PrettyMusicBook;
