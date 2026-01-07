import { RefObject, useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

interface UseIntersectionObserverReturn<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Intersection Observer 훅
 * @param options - Intersection Observer 옵션
 * @param onIntersect - (선택) 교차 상태 변경 시 실행할 콜백
 * @returns ref, isIntersecting, entry를 포함한 객체
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverOptions = {},
  onIntersect?: (entry: IntersectionObserverEntry) => void
): UseIntersectionObserverReturn<T> {
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([observerEntry]) => {
      setEntry(observerEntry);
      setIsIntersecting(observerEntry.isIntersecting);

      if (onIntersect) {
        onIntersect(observerEntry);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options, onIntersect]);

  return { ref, isIntersecting, entry };
}
