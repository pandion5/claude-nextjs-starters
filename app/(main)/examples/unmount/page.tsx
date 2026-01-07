"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useUnmount } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function UnmountingComponent({ onLog }: { onLog: (message: string) => void }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useUnmount(() => {
    const timestamp = new Date().toLocaleTimeString();
    onLog(`✓ 컴포넌트 언마운트됨 (${timestamp})`);
    onLog("✓ 정리 작업 완료: 타이머 정리, 리스너 제거");
    console.log("컴포넌트가 언마운트되었습니다. 정리 작업 완료!");
  });

  return (
    <div className="rounded border-2 border-red-500 bg-red-50 p-4 dark:bg-red-950">
      <p className="mb-2 font-semibold text-red-800 dark:text-red-300">
        ⏱️ {countdown}초 후 자동 언마운트
      </p>
      <p className="text-xs text-red-700 dark:text-red-400">
        언마운트 시 useUnmount가 실행됩니다
      </p>
    </div>
  );
}

export default function UnmountPage() {
  const [showComponent, setShowComponent] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
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
        <h1 className="mb-2 text-3xl font-bold">useUnmount</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          컴포넌트가 언마운트될 때 정리 작업을 수행합니다. 이벤트 리스너 제거,
          타이머 정리, 연결 해제에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          컴포넌트를 마운트하면 5초 후 자동으로 언마운트되며, useUnmount가
          실행됩니다.
        </p>

        <div className="space-y-6">
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setShowComponent(true);
                setTimeout(() => setShowComponent(false), 5000);
              }}
              disabled={showComponent}
            >
              {showComponent ? "실행 중..." : "컴포넌트 마운트 (5초 타이머)"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLogs([]);
              }}
            >
              로그 지우기
            </Button>
          </div>

          <div className="min-h-[80px]">
            {showComponent ? (
              <UnmountingComponent onLog={addLog} />
            ) : (
              <div className="flex h-[80px] items-center justify-center rounded border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                <p className="text-sm text-zinc-500">
                  {logs.length > 0
                    ? "컴포넌트가 언마운트되었습니다"
                    : "버튼을 클릭하여 시작하세요"}
                </p>
              </div>
            )}
          </div>

          {logs.length > 0 && (
            <div className="rounded bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                📋 실행 로그
              </p>
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <p
                    key={index}
                    className="font-mono text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="rounded bg-amber-50 p-4 dark:bg-amber-950">
            <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
              ⚠️ 중요: 정리 작업이 필요한 경우
            </p>
            <ul className="list-inside list-disc space-y-1 text-xs text-amber-700 dark:text-amber-400">
              <li>setInterval, setTimeout 정리</li>
              <li>이벤트 리스너 제거 (window, document)</li>
              <li>웹소켓, API 연결 종료</li>
              <li>구독(subscription) 취소</li>
            </ul>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>전역 이벤트 리스너 제거</li>
              <li>타이머 및 인터벌 정리</li>
              <li>WebSocket 연결 종료</li>
              <li>API 요청 취소</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`import { useUnmount } from '@/hooks';

function MyComponent() {
  useUnmount(() => {
    // 언마운트 시 정리 작업
    console.log('Cleaning up...');
    
    // 이벤트 리스너 제거
    window.removeEventListener('resize', handleResize);
    
    // 타이머 정리
    clearInterval(timerId);
  });

  return <div>...</div>;
}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
