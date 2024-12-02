// src/components/musicbook/prettymusicbook.js
// PrettyMusicBook.js | "예뻤어" 악보 기능 구현
// PracticePage.js에서 호출하여 "연습하기" 페이지에서 사용

import React, { useEffect, useState, useRef } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import pretty_Image1 from "../musicbook/DAY6_pretty_1.png"; // 첫 번째 악보 이미지
import pretty_Image2 from "../musicbook/DAY6_pretty_2.png"; // 두 번째 악보 이미지
import pretty_Image3 from "../musicbook/DAY6_pretty_3.png"; // 세 번째 악보 이미지
import pretty_Image4 from "../musicbook/DAY6_pretty_4.png"; // 네 번째 악보 이미지
import pretty_Image5 from "../musicbook/DAY6_pretty_5.png"; // 다섯 번째 악보 이미지
import pretty_Image6 from "../musicbook/DAY6_pretty_6.png"; // 여섯 번째 악보 이미지
import pretty_Image7 from "../musicbook/DAY6_pretty_7.png"; // 일곱 번째 악보 이미지
import pretty_Image8 from "../musicbook/DAY6_pretty_8.png"; // 여덟 번째 악보 이미지
import pretty_Image9 from "../musicbook/DAY6_pretty_9.png"; // 아홉 번째 악보 이미지

import "./prettymusicbook.css";

const PrettyMusicBook = () => {
  // 현재 보여지는 악보 이미지 상태
  const [currentScoreImage, setCurrentScoreImage] = useState(pretty_Image1);

  // 현재 강조된 마디 상태 (네모박스)
  const [highlightedMeasure, setHighlightedMeasure] = useState(null);

  // 음악 재생 상태
  const [isPlaying, setIsPlaying] = useState(false);

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
      setIsPlaying(true); // 재생 상태로 변경
      syncHighlights(audioRef.current.currentTime * 1000); // 현재 시간에 맞춰 네모박스 동기화
      syncScoreImages(audioRef.current.currentTime * 1000); // 현재 시간에 맞춰 이미지 동기화
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
    timers.current.forEach(clearTimeout); // 배열에 저장된 모든 타이머 해제
    timers.current = []; // 타이머 배열 초기화
  };

  // 하이라이트 타이밍을 현재 오디오 시간에 맞춰 설정하는 함수
  const syncHighlights = (startTime = 0) => {
    const highlightTiming = [
      { time: 0, measure: 1 },
      { time: 3000, measure: 2 },
      { time: 6000, measure: 3 },
      { time: 9000, measure: 4 },
      { time: 12050, measure: 5 },
      { time: 15000, measure: 6 },
      { time: 17200, measure: 7 },
      { time: 20100, measure: 8 },
      { time: 23000, measure: 9 },
      { time: 26000, measure: 10 },
      { time: 29000, measure: 11 },
      { time: 32000, measure: 12 },
      { time: 34000, measure: 13 },
      { time: 37000, measure: 14 },
      { time: 40000, measure: 15 },
      { time: 43000, measure: 16 },
      { time: 46000, measure: 17 },
      { time: 48000, measure: 18 },
      { time: 51000, measure: 19 },
      { time: 54000, measure: 20 },
      { time: 56000, measure: 21 },
      { time: 59000, measure: 22 },
      { time: 62000, measure: 23 },
      { time: 65000, measure: 24 },
      { time: 68000, measure: 25 },
      { time: 71000, measure: 26 },
      { time: 74000, measure: 27 },
      { time: 77000, measure: 28 },
      { time: 79000, measure: 29 },
      { time: 82000, measure: 30 },
      { time: 85000, measure: 31 },
      { time: 88000, measure: 32 },
      { time: 91000, measure: 33 },
      { time: 94000, measure: 34 },
      { time: 97000, measure: 35 },
      { time: 100000, measure: 36 },
    ];

    // 현재 시간에 맞춰 하이라이트 타이밍 설정
    highlightTiming.forEach(({ time, measure }) => {
      if (time >= startTime) {
        const timer = setTimeout(() => setHighlightedMeasure(measure), time - startTime);
        timers.current.push(timer); // 타이머 ID 저장
      }
    });
  };

  // 악보 이미지 전환을 동기화하는 함수
  const syncScoreImages = (startTime = 0) => {
    const imageChangeTiming = [
      { time: 0, image: pretty_Image1 },
      { time: 12000, image: pretty_Image2 },
      { time: 23000, image: pretty_Image3 },
      { time: 34000, image: pretty_Image4 },
      { time: 46000, image: pretty_Image5 },
      { time: 56000, image: pretty_Image6 },
      { time: 67500, image: pretty_Image7 },
      { time: 79000, image: pretty_Image8 },
      { time: 91000, image: pretty_Image9 },
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
      const audioRef = ref(storage, "DAY6-예뻤어.mp3");
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

export default PrettyMusicBook;
