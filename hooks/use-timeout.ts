import { useEffect, useRef } from "react";

/**
 * 타임아웃 관리 훅
 * @param callback - 실행할 콜백
 * @param delay - 지연 시간 (ms), null이면 타임아웃 취소
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
