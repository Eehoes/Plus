// src/components/RhythmGame/note_onepage.js

// "한 페이지가 될 수 있게 - DAY6" 채보 데이터
// 각 음표사이 간격 = 0.3초?
// 마디 넘어갈 땐 0.5초
const onepageNotes = [
  /* ---------------------------------------------------- */
  // Day6_onepage_1.png
  // 1-1
  // 00:00.47
  { time: 0.0, position: "d" },

  // 1-2
  // 00:01.61
  { time: 0.4, position: "a" },
  { time: 0.7, position: "s" },
  { time: 1.0, position: "a" },
  { time: 1.3, position: "s" },
  { time: 1.3, position: "d" },

  // 1-3
  // 00:02.87
  { time: 1.7, position: "a" },
  { time: 2.0, position: "s" },
  { time: 2.3, position: "a" },
  { time: 2.6, position: "s" },
  { time: 2.6, position: "d" },

  // 1-4
  // 00:04.28
  { time: 3.0, position: "a" },
  { time: 3.3, position: "s" },
  { time: 3.6, position: "a" },
  { time: 3.9, position: "s" },
  { time: 3.9, position: "d" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_2.png
  // 2-1
  // 00:05.57
  { time: 4.3, position: "a" },
  { time: 4.6, position: "s" },
  { time: 4.9, position: "a" },
  { time: 5.2, position: "s" },
  { time: 5.2, position: "d" },

  // 2-2
  // 00:06.97
  { time: 5.6, position: "a" },
  { time: 5.9, position: "s" },
  { time: 6.2, position: "a" },
  { time: 6.5, position: "s" },
  { time: 6.5, position: "d" },

  // 2-3
  // 00:08.26
  { time: 6.9, position: "a" },
  { time: 7.2, position: "s" },
  { time: 7.5, position: "a" },
  { time: 7.8, position: "s" },
  { time: 7.8, position: "d" },

  // 2-4
  // 00:09.74
  { time: 8.2, position: "a" },
  { time: 8.5, position: "s" },
  { time: 8.8, position: "a" },
  { time: 9.1, position: "s" },
  { time: 9.1, position: "d" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_3.png
  // 3-1
  // 00:10.99
  { time: 9.5, position: "s" },
  { time: 9.8, position: "d" },
  { time: 10.1, position: "s" },
  { time: 10.4, position: "d" },

  // 3-2 (여기서부터 Intro 시작)
  // 00:12.46
  { time: 10.9, position: "a" },
  { time: 10.9, position: "d" },
  { time: 11.2, position: "s" },
  { time: 11.5, position: "a" },
  { time: 11.5, position: "d" },
  { time: 11.8, position: "s" },

  // 3-3
  // 00:13.80
  { time: 12.2, position: "a" },
  { time: 12.2, position: "d" },
  { time: 12.5, position: "s" },
  { time: 12.8, position: "a" },
  { time: 12.8, position: "d" },
  { time: 13.1, position: "s" },

  // 3-4
  // 00:15.17
  { time: 13.5, position: "a" },
  { time: 13.5, position: "d" },
  { time: 13.8, position: "s" },
  { time: 14.1, position: "a" },
  { time: 14.1, position: "d" },
  { time: 14.4, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_4.png
  // 4-1
  // 00:16.6
  { time: 14.8, position: "a" },
  { time: 14.8, position: "d" },
  { time: 15.1, position: "s" },
  { time: 15.4, position: "a" },
  { time: 15.4, position: "d" },
  { time: 15.7, position: "s" },

  // 4-2
  // 00:17.98
  { time: 16.1, position: "a" },
  { time: 16.1, position: "d" },
  { time: 16.4, position: "s" },
  { time: 16.7, position: "a" },
  { time: 16.7, position: "d" },
  { time: 17.0, position: "s" },

  // 4-3
  // 00:19.3
  { time: 17.4, position: "a" },
  { time: 17.4, position: "d" },
  { time: 17.7, position: "s" },
  { time: 18.0, position: "a" },
  { time: 18.0, position: "d" },
  { time: 18.3, position: "s" },

  // 4-4
  // 00:20.7
  { time: 18.7, position: "a" },
  { time: 18.7, position: "d" },
  { time: 19.0, position: "s" },
  { time: 19.3, position: "a" },
  { time: 19.3, position: "d" },
  { time: 19.6, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_5.png
  // 5-1
  // 00:22.08
  { time: 20.0, position: "a" },
  { time: 20.0, position: "d" },
  { time: 20.3, position: "s" },
  { time: 20.6, position: "a" },
  { time: 20.9, position: "s" }, // 여기까진 처음부터 다 맞음

  // 5-2
  // 00:23.40 (가사 시작)
  { time: 21.5, position: "a" },
  { time: 21.5, position: "d" },
  { time: 21.8, position: "s" },
  { time: 22.1, position: "a" },
  { time: 22.4, position: "s" },

  // 5-3
  // 00:24.88
  { time: 22.8, position: "a" },
  { time: 22.8, position: "d" },
  { time: 23.1, position: "s" },
  { time: 23.4, position: "a" },
  { time: 23.7, position: "s" },

  // 5-4
  // 00:26.22
  { time: 24.1, position: "a" },
  { time: 24.1, position: "d" },
  { time: 24.4, position: "s" },
  { time: 24.7, position: "a" },
  { time: 25.0, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_6.png
  // 6-1
  // 00:27.52
  { time: 25.4, position: "a" },
  { time: 25.4, position: "d" },
  { time: 25.7, position: "s" },
  { time: 26.0, position: "a" },
  { time: 26.3, position: "s" },

  // 6-2 (오늘이 오길~)
  // 00:29.00
  { time: 26.9, position: "a" },
  { time: 26.9, position: "d" },
  { time: 27.2, position: "s" },
  { time: 27.5, position: "a" },
  { time: 27.8, position: "s" },

  // 6-3
  // 00:30.3
  { time: 28.2, position: "a" },
  { time: 28.2, position: "d" },
  { time: 28.5, position: "s" },
  { time: 28.8, position: "a" },
  { time: 29.1, position: "s" },

  // 6-4
  // 00:31.64
  { time: 29.5, position: "a" },
  { time: 29.8, position: "s" },
  { time: 29.8, position: "d" },
  { time: 30.1, position: "a" },
  { time: 30.4, position: "s" },
  { time: 30.4, position: "d" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_7.png
  // 7-1
  // 00:33.03
  { time: 30.8, position: "a" },
  { time: 31.1, position: "s" },
  { time: 31.1, position: "d" },
  { time: 31.4, position: "a" },
  { time: 31.7, position: "s" },

  // 7-2 (솔직히 나에게도~)
  // 00:34.32
  { time: 32.3, position: "a" },
  { time: 32.3, position: "d" },
  { time: 32.6, position: "s" },
  { time: 32.9, position: "a" },
  { time: 32.9, position: "d" },
  { time: 33.2, position: "s" },

  // 7-3
  // 00:35.71
  { time: 33.6, position: "a" },
  { time: 33.6, position: "d" },
  { time: 33.9, position: "s" },
  { time: 34.2, position: "a" },
  { time: 34.2, position: "d" },
  { time: 34.5, position: "s" },

  // 7-4
  // 00:37.13
  { time: 34.9, position: "a" },
  { time: 34.9, position: "d" },
  { time: 35.2, position: "s" },
  { time: 35.5, position: "a" },
  { time: 35.5, position: "d" },
  { time: 35.8, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_8.png
  // 8-1
  // 00:38.39
  { time: 36.2, position: "a" },
  { time: 36.2, position: "d" },
  { time: 36.5, position: "s" },
  { time: 36.8, position: "a" },
  { time: 36.8, position: "d" },
  { time: 37.1, position: "s" },

  // 8-2 (오늘을 위해~)
  // 00:39.80
  { time: 37.8, position: "a" },
  { time: 37.8, position: "d" },
  { time: 38.1, position: "s" },
  { time: 38.4, position: "a" },
  { time: 38.4, position: "d" },
  { time: 38.7, position: "s" }, // 여까진 다 맞는듯 (11.17 오후까지 함)

  // 8-3
  // 00:41.20
  { time: 39.1, position: "a" },
  { time: 39.1, position: "d" },
  { time: 39.4, position: "s" },
  { time: 39.7, position: "a" },
  { time: 39.7, position: "d" },
  { time: 40.0, position: "s" },

  // 8-4
  // 00:42.50
  { time: 40.4, position: "a" },
  { time: 40.4, position: "d" },
  { time: 40.7, position: "s" },
  { time: 41.0, position: "a" },
  { time: 41.0, position: "d" },
  { time: 41.3, position: "s" },

  /* ---------------------------------------------------- */
  // Day6_onepage_9.png
  // 9-1
  // 00:43.89
  { time: 41.7, position: "a" },
  { time: 41.7, position: "d" },
  { time: 42.0, position: "s" },
  { time: 42.3, position: "a" },
  { time: 42.6, position: "s" },

  // 9-2 (All ~)
  // 00:45.27
  { time: 43.5, position: "a" },
  { time: 43.5, position: "d" },
  { time: 43.8, position: "s" },
  { time: 44.1, position: "d" },
  { time: 44.4, position: "s" },

  // 9-3
  // 00:46.67
  { time: 44.8, position: "a" },
  { time: 44.8, position: "d" },
  { time: 45.1, position: "s" },
  { time: 45.4, position: "d" },
  { time: 45.7, position: "s" },

  // 9-4
  // 00:48.03
  { time: 46.1, position: "a" },
  { time: 46.1, position: "d" },
  { time: 46.4, position: "s" },
  { time: 46.7, position: "d" },
  { time: 47.0, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_10.png (10페 전체맞음)
  // 10-1
  // 00:49.48
  { time: 47.4, position: "a" },
  { time: 47.4, position: "d" },
  { time: 47.7, position: "s" },
  { time: 48.0, position: "d" },
  { time: 48.3, position: "s" },

  // 10-2 (now ~)
  // 00:50.85
  { time: 49.2, position: "a" },
  { time: 49.2, position: "d" },
  { time: 49.5, position: "s" },
  { time: 49.8, position: "d" },
  { time: 50.1, position: "s" }, // 여까지 일욜 밤에 함

  // 10-3
  // 00:52.22
  { time: 50.5, position: "a" },
  { time: 50.5, position: "d" },
  { time: 50.8, position: "s" },
  { time: 51.1, position: "d" },
  { time: 51.4, position: "s" },

  // 10-4
  // 00:53.55
  { time: 51.8, position: "a" },
  { time: 51.8, position: "d" },
  { time: 52.1, position: "s" },
  { time: 52.4, position: "a" },
  { time: 52.4, position: "d" },
  { time: 52.7, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_11.png (여기부분은 맞는듯? 여기에 맞게 이전 타이밍 맞추기)
  // 11-1
  // 00:54.91
  { time: 53.5, position: "s" },
  { time: 53.8, position: "a" },
  { time: 54.1, position: "s" },
  // { time: 53.3, position: "a" },

  // 11-2
  // 00:56.33
  { time: 54.7, position: "a" },
  { time: 54.7, position: "d" },
  { time: 55.0, position: "s" },
  { time: 55.3, position: "a" },
  { time: 55.6, position: "s" },

  // 11-3
  // 00:57.71 (후렴구)
  { time: 56.3, position: "s" },
  { time: 56.3, position: "d" },
  { time: 56.6, position: "a" },
  { time: 56.9, position: "s" },
  { time: 56.9, position: "d" },
  { time: 57.2, position: "a" },

  // 11-4
  // 00:59.01
  { time: 57.6, position: "s" },
  { time: 57.6, position: "d" },
  { time: 57.9, position: "a" },
  { time: 58.2, position: "s" },
  { time: 58.2, position: "d" },
  { time: 58.5, position: "a" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_12.png
  // 12-1
  // 01:00.36
  { time: 58.9, position: "s" },
  { time: 58.9, position: "d" },
  { time: 59.2, position: "a" },
  { time: 59.5, position: "s" },
  { time: 59.5, position: "d" },
  { time: 59.8, position: "a" },

  // 12-2
  // 01:01.75
  { time: 60.2, position: "s" },
  { time: 60.2, position: "d" },
  { time: 60.5, position: "a" },
  { time: 60.8, position: "s" },
  { time: 60.8, position: "d" },
  { time: 61.1, position: "a" },

  // 12-3 (너와의 추억들로 ~)
  // 01:03.09
  { time: 61.7, position: "s" },
  { time: 61.7, position: "d" },
  { time: 62.0, position: "a" },
  { time: 62.3, position: "s" },
  { time: 62.3, position: "d" },
  { time: 62.6, position: "a" },

  // 12-4
  // 01:04.46
  { time: 63.0, position: "s" },
  { time: 63.0, position: "d" },
  { time: 63.3, position: "a" },
  { time: 63.6, position: "s" },
  { time: 63.6, position: "d" },
  { time: 63.9, position: "a" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_13.png
  // 13-1
  // 01:05.84
  { time: 64.3, position: "s" },
  { time: 64.3, position: "d" },
  { time: 64.6, position: "a" },
  { time: 64.9, position: "s" },
  { time: 64.9, position: "d" },
  { time: 65.2, position: "a" },

  // 13-2
  // 01:07.22
  { time: 65.6, position: "a" },
  { time: 65.6, position: "d" },
  { time: 65.9, position: "s" },
  { time: 66.2, position: "a" },
  { time: 66.5, position: "s" },

  // 13-3 (아무 걱정도 ~) 아래부터 맞는듯
  // 01:08.61
  { time: 67.3, position: "a" },
  { time: 67.3, position: "d" },
  { time: 67.6, position: "s" },
  { time: 67.9, position: "a" },
  { time: 67.9, position: "d" },
  { time: 68.2, position: "s" },

  // 13-4
  // 01:09.96
  { time: 68.6, position: "a" },
  { time: 68.6, position: "d" },
  { time: 68.9, position: "s" },
  { time: 69.2, position: "a" },
  { time: 69.2, position: "d" },
  { time: 69.5, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_14.png
  // 14-1
  // 01:11.31
  { time: 69.9, position: "a" },
  { time: 69.9, position: "d" },
  { time: 70.2, position: "s" },
  { time: 70.5, position: "a" },
  { time: 70.5, position: "d" },
  { time: 70.8, position: "s" },

  // 14-2
  // 01:12.78
  { time: 71.1, position: "a" },
  { time: 71.1, position: "d" },
  { time: 71.4, position: "s" },
  { time: 71.7, position: "a" },
  { time: 71.7, position: "d" },
  { time: 72.0, position: "s" },

  // 14-3 (지금 이 순간이 ~)
  // 01:14.05
  { time: 72.5, position: "a" },
  { time: 72.5, position: "d" },
  { time: 72.8, position: "s" },
  { time: 73.1, position: "a" },
  { time: 73.1, position: "d" },
  { time: 73.4, position: "s" },

  // 14-4
  // 01:15.53
  { time: 73.8, position: "a" },
  { time: 73.8, position: "d" },
  { time: 74.1, position: "s" },
  { time: 75.4, position: "a" },
  { time: 75.4, position: "d" },
  { time: 75.7, position: "s" },

  // Day6_onepage_15.png
  // 15-1 (다시 넘겨 ~) 여기아래부터 맞음
  // 01:16.90
  { time: 76.1, position: "a" },
  { time: 76.1, position: "d" },
  { time: 76.4, position: "s" },
  { time: 76.7, position: "a" },
  { time: 77.0, position: "s" }, // (여까지 함)

  // 15-2
  // 01:18.27
  { time: 77.4, position: "a" },
  { time: 77.4, position: "d" },
  { time: 77.7, position: "s" },
  { time: 78.0, position: "a" },
  { time: 78.3, position: "s" },

  // 15-3
  // 01:19.56
  { time: 78.7, position: "a" },
  { time: 78.7, position: "d" },
  { time: 79.0, position: "s" },
  { time: 79.3, position: "a" },
  { time: 79.6, position: "s" },

  // 01:21.02
  // 15-4
  { time: 80.0, position: "a" },
  { time: 80.0, position: "d" },
  { time: 80.3, position: "s" },
  { time: 80.6, position: "a" },
  { time: 80.9, position: "s" },

  /* ---------------------------------------------------- */
  // Day6_onepage_16.png (아래 다 맞음)
  // 16-1 [Out]
  // 01:22.31
  { time: 81.4, position: "a" },
  { time: 81.4, position: "d" },
  { time: 81.7, position: "s" },
  { time: 82.0, position: "a" },
  { time: 82.0, position: "d" },
  { time: 82.3, position: "s" },

  // 16-2
  // 01:23.71
  { time: 82.7, position: "a" },
  { time: 82.7, position: "d" },
  { time: 83.0, position: "s" },
  { time: 83.3, position: "a" },
  { time: 83.3, position: "d" },
  { time: 83.6, position: "s" },

  // 16-3
  // 01:25.02
  { time: 84.0, position: "a" },
  { time: 84.0, position: "d" },
  { time: 84.3, position: "s" },
  { time: 84.6, position: "a" },
  { time: 84.6, position: "d" },
  { time: 84.9, position: "s" },

  // 16-4
  // 01:26.44
  { time: 85.3, position: "a" },
  { time: 85.3, position: "d" },
  { time: 85.6, position: "s" },
  { time: 85.9, position: "a" },
  { time: 85.9, position: "d" },
  { time: 86.2, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_onepage_17.png (아래 다 맞음)
  // 17-1
  // 01:27.82
  { time: 86.6, position: "s" },
  { time: 86.6, position: "d" },
  { time: 86.9, position: "a" },
  { time: 87.2, position: "s" },
  { time: 87.2, position: "d" },
  { time: 87.5, position: "a" },

  // 17-2
  // 01:29.15
  { time: 87.9, position: "s" },
  { time: 87.9, position: "d" },
  { time: 88.2, position: "a" },
  { time: 88.5, position: "s" },
  { time: 88.5, position: "d" },
  { time: 88.8, position: "a" },

  // 17-3
  // 01:30.47
  { time: 89.2, position: "s" },
  { time: 89.2, position: "d" },
  { time: 89.5, position: "a" },
  { time: 89.8, position: "s" },
  { time: 89.8, position: "d" },
  { time: 90.1, position: "a" },

  // 17-4
  // 01:31.89
  { time: 90.5, position: "a" },
  { time: 90.5, position: "d" },
  { time: 90.8, position: "s" },
  { time: 91.1, position: "a" },
  { time: 91.4, position: "s" },
  /* ---------------------------------------------------- */
];

// 채보 데이터를 외부로 내보내기
export default onepageNotes;
