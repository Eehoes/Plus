// src/components/musicbook/onepagemusicbook.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import noMusicImage from "../musicbook/no_musicbook.png";
import onepage_Image1 from "../musicbook/DAY6_onepage_1.png";
import onepage_Image2 from "../musicbook/DAY6_onepage_2.png";
import onepage_Image3 from "../musicbook/DAY6_onepage_3.png";
import onepage_Image4 from "../musicbook/DAY6_onepage_4.png";
import onepage_Image5 from "../musicbook/DAY6_onepage_5.png";
import onepage_Image6 from "../musicbook/DAY6_onepage_6.png";
import onepage_Image7 from "../musicbook/DAY6_onepage_7.png";
import onepage_Image8 from "../musicbook/DAY6_onepage_8.png";
import onepage_Image9 from "../musicbook/DAY6_onepage_9.png";
import onepage_Image10 from "../musicbook/DAY6_onepage_10.png";
import onepage_Image11 from "../musicbook/DAY6_onepage_11.png";
import onepage_Image12 from "../musicbook/DAY6_onepage_12.png";
import onepage_Image13 from "../musicbook/DAY6_onepage_13.png";
import onepage_Image14 from "../musicbook/DAY6_onepage_14.png";
import onepage_Image15 from "../musicbook/DAY6_onepage_15.png";
import onepage_Image16 from "../musicbook/DAY6_onepage_16.png";
import onepage_Image17 from "../musicbook/DAY6_onepage_17.png";
import "./onepagemusicbook.css";

// 설명주석은 prettymusicbook.js 코드파일에 대신 적음

const OnePageMusicBook = () => {
  const [currentScoreImage, setCurrentScoreImage] = useState(noMusicImage);
  const [highlightedMeasure, setHighlightedMeasure] = useState(null);
  const timers = useRef([]);
  const musicStartTime = useRef(null);

  const handleMusicStart = useCallback(() => {
    musicStartTime.current = Date.now();

    const changeScoreImage = [
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
    ];

    changeScoreImage.forEach(({ time, image }) => {
      const delay = time - (Date.now() - musicStartTime.current);
      const timer = setTimeout(
        () => setCurrentScoreImage(image),
        Math.max(0, delay)
      );
      timers.current.push(timer);
    });

    highlightTiming.forEach(({ time, measure }) => {
      const delay = time - (Date.now() - musicStartTime.current);
      const timer = setTimeout(
        () => setHighlightedMeasure(measure),
        Math.max(0, delay)
      );
      timers.current.push(timer);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("musicStart", handleMusicStart);
    const savedTimers = timers.current;

    return () => {
      window.removeEventListener("musicStart", handleMusicStart);
      savedTimers.forEach(clearTimeout);
    };
  }, [handleMusicStart]);

  return (
    <div className="musicbook">
      <div className="imagebox_field">
        <img
          src={currentScoreImage}
          alt="Score Sheet"
          className="sheet_image"
        />
        {highlightedMeasure && (
          <div className={`red_box measure-${highlightedMeasure}`}></div>
        )}
      </div>
    </div>
  );
};

export default OnePageMusicBook;
