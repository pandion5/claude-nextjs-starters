"use client";

import { useState } from "react";

import Link from "next/link";

import { useThrottle } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ThrottlePage() {
  const [scrollY, setScrollY] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 500);
  const throttledClickCount = useThrottle(clickCount, 1000);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useThrottle</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          값이 일정 시간 간격으로만 업데이트되도록 제한합니다. 스크롤, 리사이즈
          등 빈번한 이벤트 최적화에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          버튼을 빠르게 클릭해도 1초마다 한 번씩만 업데이트됩니다.
        </p>

        <div className="space-y-6">
          {/* Button Click Demo */}
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">
                버튼 클릭 쓰로틀링 (1초)
              </p>
              <Button onClick={() => setClickCount((prev) => prev + 1)}>
                빠르게 클릭하세요!
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  실제 클릭 횟수
                </p>
                <p className="mt-1 text-3xl font-bold text-blue-600">
                  {clickCount}
                </p>
              </div>
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  쓰로틀된 값 (1초마다)
                </p>
                <p className="mt-1 text-3xl font-bold text-purple-600">
                  {throttledClickCount}
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Demo */}
          <div className="space-y-4">
            <p className="text-sm font-medium">스크롤 위치 쓰로틀링 (500ms)</p>
            <div
              className="h-64 overflow-y-auto rounded border p-4"
              onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
            >
              <div className="space-y-4">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className="rounded border p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    아이템 {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  실시간 스크롤 위치
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {scrollY.toFixed(0)}px
                </p>
              </div>
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  쓰로틀된 값 (500ms마다)
                </p>
                <p className="mt-1 text-2xl font-bold text-purple-600">
                  {throttledScrollY.toFixed(0)}px
                </p>
              </div>
            </div>
          </div>

          <div className="rounded bg-amber-50 p-4 dark:bg-amber-950">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              💡 Debounce vs Throttle
            </p>
            <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
              <strong>Debounce</strong>: 마지막 이벤트 후 일정 시간 대기 (검색
              입력)
              <br />
              <strong>Throttle</strong>: 일정 시간 간격으로 실행 (스크롤,
              리사이즈)
            </p>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [scrollY, setScrollY] = useState(0);
const throttledScrollY = useThrottle(scrollY, 500);

<div onScroll={(e) => setScrollY(e.target.scrollTop)}>
  {/* 스크롤 이벤트가 빈번해도 500ms마다만 업데이트 */}
</div>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
