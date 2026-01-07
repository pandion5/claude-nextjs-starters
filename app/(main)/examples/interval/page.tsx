"use client";

import { useState } from "react";

import Link from "next/link";

import { useInterval } from "@/hooks";
import { ArrowLeft, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function IntervalPage() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const resetCount = useInterval(
    () => {
      setCount((prev) => prev + 1);
    },
    isRunning ? 1000 : null
  );

  const resetTime = useInterval(
    () => {
      setTime((prev) => prev + 1);
    },
    isRunning ? 100 : null
  );

  const reset = () => {
    setCount(0);
    setTime(0);
    setIsRunning(false);
    resetCount();
    resetTime();
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 10;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms}`;
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
        <h1 className="mb-2 text-3xl font-bold">useInterval</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          일정 시간 간격으로 함수를 반복 실행합니다. 타이머, 실시간 업데이트,
          애니메이션에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          스톱워치 예제 - 시작, 일시정지, 리셋 기능
        </p>

        <div className="space-y-6">
          {/* Stopwatch Display */}
          <div className="flex justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-12 text-center text-white shadow-2xl">
              <p className="font-mono text-6xl font-bold">{formatTime(time)}</p>
              <p className="mt-4 text-sm opacity-90">
                {isRunning ? "⏱️ 실행 중" : "⏸️ 일시정지"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              size="lg"
              variant={isRunning ? "outline" : "default"}
            >
              {isRunning ? (
                <>
                  <PauseIcon className="mr-2 h-5 w-5" />
                  일시정지
                </>
              ) : (
                <>
                  <PlayIcon className="mr-2 h-5 w-5" />
                  시작
                </>
              )}
            </Button>
            <Button onClick={reset} size="lg" variant="outline">
              <RotateCcwIcon className="mr-2 h-5 w-5" />
              리셋
            </Button>
          </div>

          {/* Counter */}
          <div className="rounded border p-4 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              경과 시간 (초)
            </p>
            <p className="mt-2 text-4xl font-bold text-blue-600">{count}</p>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>타이머, 스톱워치</li>
              <li>실시간 데이터 폴링</li>
              <li>진행률 바 애니메이션</li>
              <li>자동 슬라이드쇼</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [count, setCount] = useState(0);
const [isRunning, setIsRunning] = useState(false);

// useInterval은 reset 함수를 반환합니다
const resetInterval = useInterval(
  () => {
    setCount((prev) => prev + 1);
  },
  isRunning ? 1000 : null // null이면 인터벌 중지
);

const handleReset = () => {
  setCount(0);
  setIsRunning(false);
  resetInterval(); // 경과 시간 초기화
};

<button onClick={() => setIsRunning(!isRunning)}>
  {isRunning ? '일시정지' : '시작'}
</button>
<button onClick={handleReset}>리셋</button>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
