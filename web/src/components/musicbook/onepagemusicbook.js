// src/components/musicbook/onepagemusicbook.js
// OnePageMusicBook.js | "한 페이지가 될 수 있게" 악보 기능 구현
// PracticePage.js에서 호출하여 "연습하기" 페이지에서 사용

import React, { useEffect, useState, useRef } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import onepage_Image1 from "../musicbook/DAY6_onepage_1.png"; // 첫 번째 악보 이미지
import onepage_Image2 from "../musicbook/DAY6_onepage_2.png"; // 두 번째 악보 이미지
import onepage_Image3 from "../musicbook/DAY6_onepage_3.png"; // 세 번째 악보 이미지
import onepage_Image4 from "../musicbook/DAY6_onepage_4.png"; // 네 번째 악보 이미지
import onepage_Image5 from "../musicbook/DAY6_onepage_5.png"; // 다섯 번째 악보 이미지
import onepage_Image6 from "../musicbook/DAY6_onepage_6.png"; // 여섯 번째 악보 이미지
import onepage_Image7 from "../musicbook/DAY6_onepage_7.png"; // 일곱 번째 악보 이미지
import onepage_Image8 from "../musicbook/DAY6_onepage_8.png"; // 여덟 번째 악보 이미지
import onepage_Image9 from "../musicbook/DAY6_onepage_9.png"; // 아홉 번째 악보 이미지
import onepage_Image10 from "../musicbook/DAY6_onepage_10.png"; // 열 번째 악보 이미지
import onepage_Image11 from "../musicbook/DAY6_onepage_11.png"; // 열한 번째 악보 이미지
import onepage_Image12 from "../musicbook/DAY6_onepage_12.png"; // 열두 번째 악보 이미지
import onepage_Image13 from "../musicbook/DAY6_onepage_13.png"; // 열세 번째 악보 이미지
import onepage_Image14 from "../musicbook/DAY6_onepage_14.png"; // 열네 번째 악보 이미지
import onepage_Image15 from "../musicbook/DAY6_onepage_15.png"; // 열다섯 번째 악보 이미지
import onepage_Image16 from "../musicbook/DAY6_onepage_16.png"; // 열여섯 번째 악보 이미지
import onepage_Image17 from "../musicbook/DAY6_onepage_17.png"; // 열일곱 번째 악보 이미지
import "./onepagemusicbook.css"; // CSS 파일 불러오기

const OnePageMusicBook = () => {
  // 현재 보여지는 악보 이미지 상태
  const [currentScoreImage, setCurrentScoreImage] = useState(onepage_Image1);

  // 현재 강조된 마디 상태 (네모박스)
  const [highlightedMeasure, setHighlightedMeasure] = useState(null);

  // 음악 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);

  // Firebase 음원 URL 상태
// 음원 URL 상태
  const [audioUrl, setAudioUrl] = useState(null);

  // 오디오 참조 (재생 제어에 사용)
  const audioRef = useRef(null);

  // 모든 타이머 ID를 저장하는 배열
  const timers = useRef([]);

  // 시작하기 버튼 클릭 시 실행되는 함수
  const startMusic = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play(); // 오디오 재생 시작
      setIsPlaying(true); // 재생 상태를 "재생 중"으로 변경
      syncHighlights(audioRef.current.currentTime * 1000); // 하이라이트 동기화
      syncScoreImages(audioRef.current.currentTime * 1000); // 이미지 전환 동기화
    }
  };

   // 멈추기 버튼 클릭 시 실행되는 함수
   const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // 오디오 일시정지
    }
    setIsPlaying(false); // 재생 상태를 정지 상태로 변경
    clearAllTimers(); // 모든 타이머 정리
  };

  // 모든 타이머를 정리하는 함수
  const clearAllTimers = () => {
    timers.current.forEach(clearTimeout); // 등록된 타이머를 모두 제거
    timers.current = []; // 타이머 배열 초기화
  };

  // 하이라이트 타이밍을 설정하는 함수
  const syncHighlights = (startTime = 0) => {
    const highlightTiming = [
      { time: 0, measure: 1 },
      { time: 1500, measure: 2 },
      { time: 2800, measure: 3 },
      { time: 4100, measure: 4 },
      { time: 5500, measure: 5 },
      { time: 6700, measure: 6 },
      { time: 8300, measure: 7 },
      { time: 9600, measure: 8 },
      { time: 10700, measure: 9 },
      { time: 12500, measure: 10 },
      { time: 13930, measure: 11 },
      { time: 15200, measure: 12 },
      { time: 16500, measure: 13 },
      { time: 18070, measure: 14 },
      { time: 19130, measure: 15 },
      { time: 20530, measure: 16 },
      { time: 21900, measure: 17 },
      { time: 23300, measure: 18 },
      { time: 24970, measure: 19 },
      { time: 26420, measure: 20 },
      { time: 27580, measure: 21 },
      { time: 28980, measure: 22 },
      { time: 30350, measure: 23 },
      { time: 31810, measure: 24 },
      { time: 33140, measure: 25 },
      { time: 34540, measure: 26 },
      { time: 35870, measure: 27 },
      { time: 37210, measure: 28 },
      { time: 38600, measure: 29 },
      { time: 39750, measure: 30 },
      { time: 41150, measure: 31 },
      { time: 42570, measure: 32 },
      { time: 44000, measure: 33 },
      { time: 45510, measure: 34 },
      { time: 46980, measure: 35 },
      { time: 48250, measure: 36 },
      { time: 49500, measure: 37 },
      { time: 51110, measure: 38 },
      { time: 52520, measure: 39 },
      { time: 53810, measure: 40 },
      { time: 54500, measure: 41 },
      { time: 56610, measure: 42 },
      { time: 57940, measure: 43 },
      { time: 59320, measure: 44 },
      { time: 60710, measure: 45 },
      { time: 62070, measure: 46 },
      { time: 63400, measure: 47 },
      { time: 64800, measure: 48 },
      { time: 66000, measure: 49 },
      { time: 67480, measure: 50 },
      { time: 68900, measure: 51 },
      { time: 70250, measure: 52 },
      { time: 71200, measure: 53 },
      { time: 73050, measure: 54 },
      { time: 74350, measure: 55 },
      { time: 75760, measure: 56 },
      { time: 76900, measure: 57 },
      { time: 78450, measure: 58 },
      { time: 79850, measure: 59 },
      { time: 81240, measure: 60 },
      { time: 82000, measure: 61 },
      { time: 83900, measure: 62 },
      { time: 85300, measure: 63 },
      { time: 86690, measure: 64 },
      { time: 88000, measure: 65 },
      { time: 89520, measure: 66 },
      { time: 90880, measure: 67 },
      { time: 92310, measure: 68 },
    ];

    // 현재 시간에 맞춰 하이라이트 타이밍 설정
    highlightTiming.forEach(({ time, measure }) => {
      if (time >= startTime) {
        const timer = setTimeout(() => setHighlightedMeasure(measure), time - startTime);
        timers.current.push(timer); // 타이머 ID 저장
      }
    });
  };

  // 악보 이미지 전환을 설정하는 함수
  const syncScoreImages = (startTime = 0) => {
    const imageChangeTiming = [
      { time: 0, image: onepage_Image1 },
      { time: 5500, image: onepage_Image2 },
      { time: 10700, image: onepage_Image3 },
      { time: 16500, image: onepage_Image4 },
      { time: 21900, image: onepage_Image5 },
      { time: 27400, image: onepage_Image6 },
      { time: 32900, image: onepage_Image7 },
      { time: 38500, image: onepage_Image8 },
      { time: 43900, image: onepage_Image9 },
      { time: 49500, image: onepage_Image10 },
      { time: 54500, image: onepage_Image11 },
      { time: 60710, image: onepage_Image12 },
      { time: 66000, image: onepage_Image13 },
      { time: 71200, image: onepage_Image14 },
      { time: 77000, image: onepage_Image15 },
      { time: 82000, image: onepage_Image16 },
      { time: 88000, image: onepage_Image17 },
    ];

     // 현재 시간에 맞춰 악보 이미지 전환 설정
     imageChangeTiming.forEach(({ time, image }) => {
      if (time >= startTime) {
        const timer = setTimeout(() => setCurrentScoreImage(image), time - startTime);
        timers.current.push(timer); // 타이머 ID 저장
      }
    });
  };

  // Firebase에서 음원 URL을 불러오는 함수
  useEffect(() => {
    const fetchAudioUrl = async () => {
      const storage = getStorage();
      const audioRef = ref(storage, "DAY6-한 페이지가 될 수 있게.mp3");
      const url = await getDownloadURL(audioRef);
      setAudioUrl(url); // 음원 URL 설정
    };

    fetchAudioUrl();
  }, []);

  // 음악 재생 상태가 변경될 때 동기화
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      syncHighlights(audioRef.current.currentTime * 1000);
      syncScoreImages(audioRef.current.currentTime * 1000);
    } else {
      clearAllTimers();
    }
  }, [isPlaying]);

   return (
    <div className="musicbook">
      <div className="imagebox_field">
        {/* 현재 악보 이미지 & 강조 표시 */}
        <img src={currentScoreImage} alt="Score Sheet" className="sheet_image" />
        {highlightedMeasure && <div className={`red_box measure-${highlightedMeasure}`}></div>}
      </div>
      {/* 버튼 그룹 */}
      <div className="button-group">
        <button className="start-button" onClick={startMusic} disabled={!audioUrl || isPlaying}>
          시작하기
        </button>
        <button className="stop-button" onClick={stopMusic} disabled={!isPlaying}>
          멈추기
        </button>
      </div>
      {/* 오디오 엘리먼트 */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}
    </div>
  );
};

export default OnePageMusicBook;
