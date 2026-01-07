import { useEffect, useRef } from "react";

/**
 * 이전 값 추적 훅
 * @param value - 추적할 값
 * @returns 이전 값
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
