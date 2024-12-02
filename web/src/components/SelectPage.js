/* module 불러오기 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Firebase Storage import
import "./SelectPage.css";
import noSongCover from "../images/no_song_cover.png";
import songPlayerIcon from "../images/song_player.png";

const SelectPage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [firebasePreviews, setFirebasePreviews] = useState({});
  const [firebaseCovers, setFirebaseCovers] = useState({});
  const navigate = useNavigate();

  // 미리듣기 시작시간 설정 (노래마다 다름, 초 단위 설정)
  const highlightTimes = {
    pretty_highlight: 46.5,
    onepage_highlight: 57.0,
  };

  // Firebase에서 음원 및 이미지 URL 가져오기
  useEffect(() => {
    const fetchFirebaseData = async () => {
      const storage = getStorage();
      const audioUrls = {};
      const coverUrls = {};

      try {
        // 음원 파일 참조
        const prettyAudioRef = ref(storage, "DAY6-예뻤어.mp3");
        const onepageAudioRef = ref(storage, "DAY6-한 페이지가 될 수 있게.mp3");

        // 이미지 파일 참조
        const prettyImageRef = ref(storage, "예뻤어.png");
        const onepageImageRef = ref(storage, "Page.png");

        // Firebase Storage에서 음원 URL 가져오기
        const prettyAudioUrl = await getDownloadURL(prettyAudioRef);
        const onepageAudioUrl = await getDownloadURL(onepageAudioRef);

        // Firebase Storage에서 이미지 URL 가져오기
        const prettyImageUrl = await getDownloadURL(prettyImageRef);
        const onepageImageUrl = await getDownloadURL(onepageImageRef);

        // 음원 URL 저장
        audioUrls["예뻤어 - DAY6"] = prettyAudioUrl;
        audioUrls["한페이지가될수있게 - DAY6"] = onepageAudioUrl;

        // 이미지 URL 저장
        coverUrls["예뻤어 - DAY6"] = prettyImageUrl;
        coverUrls["한페이지가될수있게 - DAY6"] = onepageImageUrl;
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      }

      setFirebasePreviews(audioUrls);
      setFirebaseCovers(coverUrls);
    };

    fetchFirebaseData();
  }, []);

  // 노래 제목 클릭 시 -> 미리듣기 기능 작동
  const handleSongClick = (song, HighlightStartTime) => {
    // Firebase에서 URL 가져오기
    const previewUrl = firebasePreviews[song.title];
    const coverUrl = firebaseCovers[song.title];
    if (!previewUrl || !coverUrl) {
      console.error("Data not available for", song.title);
      return;
    }

    // 이전에 재생 중인 미리듣기 정지
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // 처음부터 다시 재생
    }

    // Firebase에서 가져온 mp3 재생
    const newAudio = new Audio(previewUrl);
    newAudio.currentTime = HighlightStartTime;

    setAudio(newAudio);
    newAudio.play();

    // 미리듣기(Preview) = 30초 (30초 후 정지 설정)
    setTimeout(() => {
      newAudio.pause();
    }, 30000);

    // 선택된 노래 상태 업데이트
    setSelectedSong({ ...song, cover: coverUrl, preview: previewUrl });
  };

  // 오디오 중지
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const handleGoToMain = () => {
    navigate("/main"); // 메인 페이지(/main)로 이동
  };

  // /practice 페이지로 이동
  const handleStartPractice = () => {
    if (selectedSong) {
      navigate("/practice", { state: { song: selectedSong } }); // 선택한 음악 데이터 전달
    }
  };

  /* UI 구성 */
  return (
    <div className="selectpage">
      {/* 연습하기 앨범 커버 이미지 (선택X, 선택O) */}
      <div className="album_cover">
        {/* 노래 제목 클릭 후, 해당 음악 앨범 커버로 변경 */}
        {selectedSong ? (
          <div className="selected_song">
            <img src={selectedSong.cover} alt="Album Cover" />
            <h2>{selectedSong.title}</h2>
            <button
              className="practice_start_button"
              onClick={handleStartPractice}
            >
              시작하기
            </button>
          </div>
        ) : (
          <div className="no_song_select">
            {/* 노래 제목 클릭 전에는 선택X의 의미인 빈 앨범 커버 */}
            <img src={noSongCover} alt="No Song Cover" />
          </div>
        )}
      </div>
      {/* 연습하기 음악 선택 플레이리스트*/}
      <div className="playlist">
        <h3>PLAYLIST</h3>
        {/* 선택1 : "DAY6 - 예뻤어" */}
        <button
          type="button"
          className="listed_song"
          onClick={() =>
            handleSongClick(
              {
                title: "예뻤어 - DAY6",
              },
              highlightTimes.pretty_highlight
            )
          }
        >
          예뻤어 - DAY6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="song_player_icon"
          />
        </button>

        {/* 선택2 : "DAY6 - 한 페이지가 될 수 있게" */}
        <button
          type="button"
          className="listed_song"
          onClick={() =>
            handleSongClick(
              {
                title: "한페이지가될수있게 - DAY6",
              },
              highlightTimes.onepage_highlight
            )
          }
        >
          한페이지가될수있게 - DAY6
          <img
            src={songPlayerIcon}
            alt="Play Icon"
            className="song_player_icon"
          />
        </button>
      </div>

      {/* '메인으로' 버튼 (/main으로 이동) */}
      <button
        type="button"
        className="select_go_main_button"
        onClick={handleGoToMain}
      >
        메인으로
      </button>
    </div>
  );
};

export default SelectPage;
