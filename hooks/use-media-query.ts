import { useEffect, useState } from "react";

/**
 * 미디어쿼리 감지 훅
 * @param query - 미디어쿼리 문자열
 * @returns 미디어쿼리 매칭 여부
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // 초기값 설정
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // 리스너 설정
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // addEventListener 사용 (모던 브라우저)
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      // 레거시 브라우저 대응
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
}
