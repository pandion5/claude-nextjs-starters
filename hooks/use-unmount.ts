import { useEffect, useRef } from "react";

/**
 * 언마운트 시 실행 훅
 * @param callback - 언마운트 시 실행할 콜백
 */
export function useUnmount(callback: () => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
}
