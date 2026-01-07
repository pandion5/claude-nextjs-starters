"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useScrollPosition } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ScrollPositionPage() {
  const { x, y } = useScrollPosition();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(y > 300);
  }, [y]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollable = documentHeight - windowHeight;
    return scrollable > 0 ? (y / scrollable) * 100 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useScrollPosition</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          페이지의 스크롤 위치를 실시간으로 추적합니다. 진행률 바, Top으로 버튼,
          스크롤 애니메이션에 활용됩니다.
        </p>
      </div>

      {/* Fixed Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${getScrollProgress()}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      {showButton && (
        <Button
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full p-0 shadow-lg"
          onClick={scrollToTop}
        >
          ↑
        </Button>
      )}

      <Card className="mb-6 p-6">
        <h3 className="mb-4 text-xl font-semibold">스크롤 정보</h3>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded bg-blue-50 p-4 dark:bg-blue-950">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              수평 스크롤 (X)
            </p>
            <p className="mt-2 text-3xl font-bold text-blue-600">{x}px</p>
          </div>
          <div className="rounded bg-purple-50 p-4 dark:bg-purple-950">
            <p className="text-sm text-purple-800 dark:text-purple-300">
              수직 스크롤 (Y)
            </p>
            <p className="mt-2 text-3xl font-bold text-purple-600">{y}px</p>
          </div>
          <div className="rounded bg-green-50 p-4 dark:bg-green-950">
            <p className="text-sm text-green-800 dark:text-green-300">진행률</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {getScrollProgress().toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="mt-4 rounded border p-3">
          <p className="mb-2 text-sm font-medium">현재 상태</p>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>스크롤 위치: {y > 0 ? `${y}px 아래로` : "최상단"}</li>
            <li>Top으로 버튼: {showButton ? "표시됨 ✓" : "숨김"}</li>
            <li>
              진행률 바: {getScrollProgress() > 0 ? "활성화 ✓" : "대기 중"}
            </li>
          </ul>
        </div>
      </Card>

      <Card className="mb-6 p-6">
        <h3 className="mb-4 text-xl font-semibold">스크롤 예제 콘텐츠</h3>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          아래로 스크롤하여 진행률 바와 Top으로 버튼을 확인하세요.
        </p>

        <div className="space-y-4">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="rounded border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <h4 className="font-semibold">섹션 {i + 1}</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const { x, y } = useScrollPosition();

// 진행률 계산
const progress = (y / scrollable) * 100;

// 조건부 렌더링
{y > 300 && <ScrollToTopButton />}

// 진행률 바
<div style={{ width: \`\${progress}%\` }} />`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
