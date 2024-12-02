import { collection, query, where, orderBy, limit, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Firebase 초기화 파일 가져오기

// 특정 사용자의 최근 게임 결과 가져오기 (최대 3개)
export const fetchRecentGameScores = async (userId) => {
  const scores = [];
  const q = query(
    collection(db, "scores"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc"), // 최신 순으로 정렬
    limit(3) // 최대 3개 가져오기
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    return scores;
  } catch (error) {
    console.error("점수 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
};

// 게임 결과 저장하기
export const saveGameScore = async (userId, songTitle, score, accuracy) => {
  const timestamp = new Date().toISOString();
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      song: songTitle,
      score,
      accuracy,
      timestamp,
    });
    console.log("점수 저장 성공!");
  } catch (error) {
    console.error("점수 저장 중 오류 발생:", error);
  }
};
