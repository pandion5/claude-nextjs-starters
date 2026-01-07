import { useEffect } from "react";

/**
 * 마운트 시 실행 훅
 * @param callback - 마운트 시 실행할 콜백
 */
export function useMount(callback: () => void) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
