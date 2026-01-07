"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useUpdateEffect } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UpdateEffectPage() {
  const [count, setCount] = useState(0);
  const [mountLogs, setMountLogs] = useState<string[]>([]);
  const [updateLogs, setUpdateLogs] = useState<string[]>([]);
  const mountLogKeyRef = useRef(0);
  const updateLogKeyRef = useRef(0);

  // 일반 useEffect - 마운트 + 업데이트 모두 실행
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `useEffect 실행 (count: ${count}) - ${timestamp}`;
    mountLogKeyRef.current += 1;
    setMountLogs((prev) => [...prev, newLog]);
  }, [count]);

  // useUpdateEffect - 업데이트만 실행 (마운트 제외)
  useUpdateEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = `useUpdateEffect 실행 (count: ${count}) - ${timestamp}`;
    updateLogKeyRef.current += 1;
    setUpdateLogs((prev) => [...prev, newLog]);
  }, [count]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useUpdateEffect</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          마운트 시에는 실행되지 않고, 업데이트 시에만 실행되는 effect입니다.
          초기 실행을 건너뛰어야 할 때 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          카운터를 변경하면 두 effect의 차이를 확인할 수 있습니다.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button onClick={() => setCount((prev) => prev - 1)}>-</Button>
            <div className="rounded bg-zinc-100 px-6 py-2 dark:bg-zinc-800">
              <span className="text-3xl font-bold">{count}</span>
            </div>
            <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
            <Button variant="outline" onClick={() => setCount(0)}>
              리셋
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* useEffect 로그 */}
            <div className="rounded border-2 border-blue-500 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-blue-800 dark:text-blue-300">
                  useEffect (마운트 + 업데이트)
                </p>
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {mountLogs.length}회
                </span>
              </div>
              <div className="max-h-50 space-y-1 overflow-y-auto">
                {mountLogs.map((log, index) => (
                  <p
                    key={index}
                    className="font-mono text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* useUpdateEffect 로그 */}
            <div className="rounded border-2 border-purple-500 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-purple-800 dark:text-purple-300">
                  useUpdateEffect (업데이트만)
                </p>
                <span className="rounded bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {updateLogs.length}회
                </span>
              </div>
              <div className="max-h-50 space-y-1 overflow-y-auto">
                {updateLogs.length > 0 ? (
                  updateLogs.map((log, index) => (
                    <p
                      key={index}
                      className="font-mono text-xs text-zinc-600 dark:text-zinc-400"
                    >
                      {log}
                    </p>
                  ))
                ) : (
                  <p className="text-xs italic text-zinc-400">
                    아직 실행되지 않음 (마운트 시 건너뜀)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded bg-blue-50 p-4 dark:bg-blue-950">
            <p className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
              📊 비교
            </p>
            <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
              <p>
                <strong>useEffect:</strong> 마운트 시에도 실행되어 총{" "}
                {mountLogs.length}회 실행
              </p>
              <p>
                <strong>useUpdateEffect:</strong> 마운트 제외하고 총{" "}
                {updateLogs.length}회 실행
              </p>
              <p className="mt-2 rounded bg-blue-100 p-2 dark:bg-blue-900">
                useUpdateEffect는 초기 마운트를 건너뛰고 업데이트만 감지합니다.
              </p>
            </div>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>값 변경 시에만 API 호출 (초기 로드 제외)</li>
              <li>폼 필드 변경 감지 (초기값 제외)</li>
              <li>필터/검색 조건 변경 추적</li>
              <li>변경 알림 표시 (초기 렌더링 제외)</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from 'react';
import { useUpdateEffect } from '@/hooks';

function UpdateEffectDemo() {
  const [count, setCount] = useState(0);
  const [mountLogs, setMountLogs] = useState<string[]>([]);
  const [updateLogs, setUpdateLogs] = useState<string[]>([]);
  const mountLogKeyRef = useRef(0);
  const updateLogKeyRef = useRef(0);

  // 일반 useEffect - 마운트 + 업데이트 모두 실행
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = \`useEffect 실행 (count: \${count}) - \${timestamp}\`;
    mountLogKeyRef.current += 1;
    setMountLogs((prev) => [...prev, newLog]);
  }, [count]);

  // useUpdateEffect - 업데이트만 실행 (마운트 제외)
  useUpdateEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = \`useUpdateEffect 실행 (count: \${count}) - \${timestamp}\`;
    updateLogKeyRef.current += 1;
    setUpdateLogs((prev) => [...prev, newLog]);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <div>useEffect 실행 횟수: {mountLogs.length}</div>
      <div>useUpdateEffect 실행 횟수: {updateLogs.length}</div>
    </div>
  );
}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
