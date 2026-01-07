import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * 업데이트 시에만 실행되는 훅 (첫 마운트 시에는 실행되지 않음)
 * @param effect - 실행할 이펙트
 * @param deps - 의존성 배열
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
