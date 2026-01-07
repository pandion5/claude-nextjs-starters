"use client";

import { useState } from "react";

import Link from "next/link";

import { useInterval, useTimeout } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TimeoutPage() {
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setMessage("");
    setCountdown(5);
    setIsRunning(true);
  };

  const cancelTimer = () => {
    setIsRunning(false);
    setMessage("타이머가 취소되었습니다.");
    setCountdown(5);
  };

  useTimeout(
    () => {
      setMessage("⏰ 5초가 지났습니다!");
      setCountdown(0);
      setIsRunning(false);
    },
    isRunning ? 5000 : null
  );

  useInterval(
    () => {
      setCountdown((prev) => prev - 1);
    },
    isRunning && countdown > 0 ? 1000 : null
  );

  const displayCountdown = isRunning ? countdown : 5;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useTimeout</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          일정 시간 후에 함수를 실행하는 타이머를 관리합니다. 알림, 자동 저장,
          지연 실행에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          타이머를 시작하고 5초 후 메시지가 표시됩니다.
        </p>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-12 text-center text-white">
              <p className="text-6xl font-bold">{displayCountdown}</p>
              <p className="mt-2 text-sm opacity-90">
                {isRunning ? "초 남음" : "대기 중"}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button onClick={startTimer} disabled={isRunning}>
              {isRunning ? "실행 중..." : "타이머 시작 (5초)"}
            </Button>
            <Button
              variant="outline"
              onClick={cancelTimer}
              disabled={!isRunning}
            >
              취소
            </Button>
          </div>

          {message && (
            <div
              className={`rounded p-4 text-center ${
                message.includes("취소")
                  ? "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  : "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
              }`}
            >
              <p className="text-lg font-semibold">{message}</p>
            </div>
          )}

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>알림 메시지 자동 닫기</li>
              <li>자동 저장 기능</li>
              <li>지연된 API 호출</li>
              <li>툴팁 표시 지연</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [countdown, setCountdown] = useState(5);
const [isRunning, setIsRunning] = useState(false);

// 5초 후 실행 (한 번만)
useTimeout(
  () => {
    setMessage('5초가 지났습니다!');
    setCountdown(0);
    setIsRunning(false);
  },
  isRunning ? 5000 : null
);

// 카운트다운 (1초마다 반복)
useInterval(
  () => setCountdown(prev => prev - 1),
  isRunning && countdown > 0 ? 1000 : null
);

const displayCountdown = isRunning ? countdown : 5;`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
