import { useCallback, useState } from "react";

/**
 * boolean 토글 훅
 * @param initialValue - 초기값
 * @returns [값, 토글 함수, setValue 함수]
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}
