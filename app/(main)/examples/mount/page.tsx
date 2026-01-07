"use client";

import { useState } from "react";

import Link from "next/link";

import { useMount } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function DemoComponent() {
  const [logs, setLogs] = useState<string[]>([]);

  useMount(() => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `✓ 컴포넌트 마운트됨 (${timestamp})`]);

    // 예: 마운트 시 데이터 로드
    console.log("컴포넌트가 마운트되었습니다.");
  });

  return (
    <div className="rounded border-2 border-green-500 bg-green-50 p-4 dark:bg-green-950">
      <p className="mb-2 font-semibold text-green-800 dark:text-green-300">
        📦 마운트된 컴포넌트
      </p>
      <div className="space-y-1">
        {logs.map((log, index) => (
          <p key={index} className="text-xs text-green-700 dark:text-green-400">
            {log}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function MountPage() {
  const [showComponent, setShowComponent] = useState(false);
  const [mountCount, setMountCount] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useMount</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          컴포넌트가 마운트될 때 한 번만 실행됩니다. 초기 데이터 로딩, 이벤트
          리스너 등록에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          컴포넌트를 마운트/언마운트하면서 useMount가 실행되는 것을 확인하세요.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                setShowComponent(!showComponent);
                if (!showComponent) {
                  setMountCount((prev) => prev + 1);
                }
              }}
            >
              {showComponent ? "컴포넌트 언마운트" : "컴포넌트 마운트"}
            </Button>
            <div className="rounded bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                마운트 횟수:{" "}
              </span>
              <span className="font-bold">{mountCount}</span>
            </div>
          </div>

          <div className="min-h-[100px]">
            {showComponent ? (
              <DemoComponent />
            ) : (
              <div className="flex h-[100px] items-center justify-center rounded border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                <p className="text-sm text-zinc-500">
                  컴포넌트가 언마운트되었습니다
                </p>
              </div>
            )}
          </div>

          <div className="rounded bg-blue-50 p-4 dark:bg-blue-950">
            <p className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
              💡 useMount vs useEffect
            </p>
            <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
              <p>
                <strong>useMount:</strong> 마운트 시 한 번만 실행 (간결한 문법)
              </p>
              <p>
                <strong>useEffect(() =&gt; {}, []):</strong> 동일한 동작
              </p>
              <p className="mt-2 rounded bg-blue-100 p-2 dark:bg-blue-900">
                useMount는 의도를 명확히 표현하여 코드 가독성을 높입니다.
              </p>
            </div>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>컴포넌트 마운트 시 데이터 로드</li>
              <li>전역 이벤트 리스너 등록</li>
              <li>애널리틱스 페이지뷰 추적</li>
              <li>초기 설정 및 구성</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`import { useMount } from '@/hooks';

function MyComponent() {
  useMount(() => {
    // 마운트 시 한 번만 실행
    console.log('Component mounted!');
    
    // 데이터 로드
    fetchData();
    
    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);
  });

  return <div>...</div>;
}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
