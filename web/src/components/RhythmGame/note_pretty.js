// src/components/RhythmGame/note_pretty.js

// "예뻤어 - DAY6" 채보 데이터
// 각 음표사이 간격 = 0.7초?
const prettyNotes = [
  /* ---------------------------------------------------- */
  // Day6_pretty_1.png
  // 1-1
  // 0:0 ~
  { time: 0.9, position: "a" },

  // 1-3
  { time: 6.4, position: "a" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_2.png
  // 2-1
  // 0:12 ~
  { time: 10.3, position: "a" },

  // 2-3
  // 0:17 ~
  { time: 16.2, position: "a" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_3.png
  // 3-1
  // 0:23 ~
  { time: 21.7, position: "a" },

  // 3-3
  // 0:28 ~
  { time: 27.5, position: "a" },

  // 3-4
  { time: 31.7, position: "d" },
  { time: 32.5, position: "a" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_4.png
  // 4-1
  // 0:34 ~
  { time: 33.2, position: "a" },
  { time: 33.2, position: "d" },
  { time: 33.9, position: "s" },
  { time: 34.6, position: "a" },
  { time: 34.6, position: "d" },
  { time: 35.3, position: "s" },

  // 4-2
  // 0:37 ~
  { time: 36.1, position: "a" },
  { time: 36.1, position: "d" },
  { time: 36.8, position: "s" },
  { time: 37.5, position: "a" },
  { time: 37.5, position: "d" },
  { time: 38.2, position: "s" },

  // 4-3
  // 0:40 ~
  { time: 38.9, position: "a" },
  { time: 38.9, position: "d" },
  { time: 39.6, position: "s" },
  { time: 40.3, position: "a" },
  { time: 40.3, position: "d" },
  { time: 41.0, position: "s" },

  // 4-4
  // 0:43 ~
  { time: 41.7, position: "a" },
  { time: 41.7, position: "d" },
  { time: 42.4, position: "s" },
  { time: 43.1, position: "a" },
  { time: 43.1, position: "d" },
  { time: 43.8, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_5.png
  // 5-1
  // 0:46 ~
  { time: 44.5, position: "a" },
  { time: 44.5, position: "d" },
  { time: 45.2, position: "s" },
  { time: 45.9, position: "a" },
  { time: 45.9, position: "d" },
  { time: 46.6, position: "s" },

  // 5-2
  // 0:48 ~
  { time: 47.3, position: "a" },
  { time: 47.3, position: "d" },
  { time: 48.0, position: "s" },
  { time: 48.7, position: "a" },
  { time: 48.7, position: "d" },
  { time: 49.4, position: "s" },

  // 5-3
  // 0:52 ~
  { time: 50.1, position: "a" },
  { time: 50.1, position: "d" },
  { time: 50.8, position: "s" },
  { time: 51.5, position: "a" },
  { time: 51.5, position: "d" },
  { time: 52.2, position: "s" },

  // 5-4
  // 0:54 ~
  { time: 52.9, position: "a" },
  { time: 54.3, position: "a" },
  { time: 55.0, position: "d" },
  /* ---------------------------------------------------- */

  // 아래 후렴구부터 작업하기 (11.17 ~)

  /* ---------------------------------------------------- */
  // Day6_pretty_6.png (후렴구 시작)
  // 6-1
  // 0:57 ~
  { time: 55.7, position: "a" },
  { time: 55.7, position: "d" },
  { time: 56.4, position: "s" },
  { time: 57.1, position: "a" },
  { time: 57.1, position: "d" },
  { time: 57.8, position: "s" },

  // 6-2
  // 1:00 ~
  { time: 58.5, position: "a" },
  { time: 58.5, position: "d" },
  { time: 59.2, position: "s" },
  { time: 59.9, position: "a" },
  { time: 59.9, position: "d" },
  { time: 60.6, position: "s" },

  // 6-3
  // 1:03 ~
  { time: 61.3, position: "a" },
  { time: 61.3, position: "d" },
  { time: 62.0, position: "s" },
  { time: 62.7, position: "a" },
  { time: 62.7, position: "d" },
  { time: 63.4, position: "s" },

  // 6-4
  // 1:06 ~
  { time: 64.1, position: "a" },
  { time: 64.1, position: "d" },
  { time: 64.8, position: "s" },
  { time: 65.5, position: "a" },
  { time: 65.5, position: "d" },
  { time: 66.2, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_7.png
  // 7-1
  // 1:08 ~
  { time: 66.9, position: "a" },
  { time: 66.9, position: "d" },
  { time: 67.6, position: "s" },
  { time: 68.3, position: "a" },
  { time: 69.0, position: "s" },

  // 7-2
  // 1:11 ~
  { time: 69.7, position: "a" },
  { time: 69.7, position: "d" },
  { time: 70.4, position: "s" },
  { time: 71.1, position: "a" },
  { time: 71.8, position: "s" },

  // 7-3
  // 1:14 ~
  { time: 72.5, position: "a" },
  { time: 72.5, position: "d" },
  { time: 73.2, position: "s" },
  { time: 73.9, position: "a" },
  { time: 74.6, position: "s" },

  // 7-4
  // 1:17 ~
  { time: 75.3, position: "a" },
  { time: 75.3, position: "d" },
  { time: 76.0, position: "s" },
  { time: 76.7, position: "a" },
  { time: 77.4, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_8.png
  // 8-1
  // 1:20 ~
  { time: 78.1, position: "a" },
  { time: 78.1, position: "d" },
  { time: 78.8, position: "s" },
  { time: 79.5, position: "a" },
  { time: 79.5, position: "d" },
  { time: 80.2, position: "s" },

  // 8-2
  // 1:23 ~
  { time: 80.9, position: "a" },
  { time: 80.9, position: "d" },
  { time: 81.6, position: "s" },
  { time: 82.3, position: "a" },
  { time: 82.3, position: "d" },
  { time: 83.0, position: "s" },

  // 8-3
  // 1:25.5 ~
  { time: 83.7, position: "a" },
  { time: 83.7, position: "d" },
  { time: 84.4, position: "s" },
  { time: 85.1, position: "a" },
  { time: 85.1, position: "d" },
  { time: 85.8, position: "s" },

  // 8-4
  // 1:28.5 ~
  { time: 86.5, position: "a" },
  { time: 86.5, position: "d" },
  { time: 87.2, position: "s" },
  { time: 87.9, position: "a" },
  { time: 87.9, position: "d" },
  { time: 88.6, position: "s" },
  /* ---------------------------------------------------- */

  /* ---------------------------------------------------- */
  // Day6_pretty_9.png
  // 9-1
  // 1:31.5 ~
  { time: 89.3, position: "a" },
  { time: 89.3, position: "d" },
  { time: 90.0, position: "s" },
  { time: 90.7, position: "a" },
  { time: 91.4, position: "s" },

  // 9-2
  // 1:34.5 ~
  { time: 92.1, position: "a" },
  { time: 92.1, position: "d" },
  { time: 92.8, position: "s" },
  { time: 93.5, position: "a" },
  { time: 94.2, position: "s" },

  // 9-3
  // 1:37 ~
  { time: 94.9, position: "a" },
  { time: 94.9, position: "d" },
  { time: 95.6, position: "s" },
  { time: 96.3, position: "a" },
  { time: 97.0, position: "s" },

  // 9-4
  // 1:40 ~
  { time: 97.7, position: "a" },
  { time: 97.7, position: "d" },
  { time: 98.4, position: "s" },
  { time: 99.1, position: "a" },
  { time: 99.8, position: "s" },
  /* ---------------------------------------------------- */
];

export default prettyNotes;
