import { useCallback, useEffect, useRef } from "react";

/**
 * 인터벌 관리 훅 (일시정지/재시작 시 정확한 타이밍 유지)
 * @param callback - 실행할 콜백
 * @param delay - 간격 (ms), null이면 인터벌 취소
 * @returns reset - 경과 시간을 초기화하는 함수
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    let intervalId: NodeJS.Timeout | undefined;

    // 남은 시간 계산 (일시정지 전 경과 시간 고려)
    const remainingTime = delay - (elapsedTimeRef.current % delay);

    // 시작 시간 기록
    startTimeRef.current = Date.now();

    // 첫 번째 틱: 남은 시간만큼만 대기
    const timeoutId = setTimeout(() => {
      savedCallback.current();

      // 이후 정상 간격으로 반복
      intervalId = setInterval(() => {
        savedCallback.current();
      }, delay);
    }, remainingTime);

    return () => {
      // cleanup: 모든 타이머 정리
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);

      // 마지막 경과 시간 저장
      elapsedTimeRef.current += Date.now() - startTimeRef.current;
    };
  }, [delay]);

  // 경과 시간 초기화 함수
  const reset = useCallback(() => {
    elapsedTimeRef.current = 0;
  }, []);

  return reset;
}
