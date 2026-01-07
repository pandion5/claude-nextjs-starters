import { useState } from "react";

/**
 * 클립보드 복사 훅
 * @returns [복사된 텍스트, 복사 함수, 복사 성공 여부]
 */
export function useCopyToClipboard(): [
  string,
  (text: string) => Promise<void>,
  boolean,
] {
  const [copiedText, setCopiedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);

      // 2초 후 리셋
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.warn("Copy failed", error);
      setIsCopied(false);
    }
  };

  return [copiedText, copy, isCopied];
}
