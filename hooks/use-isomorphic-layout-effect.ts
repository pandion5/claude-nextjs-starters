import { useEffect, useLayoutEffect } from "react";

/**
 * SSR 안전 레이아웃 이펙트 훅
 * 서버에서는 useEffect로, 클라이언트에서는 useLayoutEffect로 동작
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
