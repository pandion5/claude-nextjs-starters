"use client";

import { useState } from "react";

import Link from "next/link";

import { useIsomorphicLayoutEffect } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function MeasureComponent({
  onMeasure,
}: {
  onMeasure: (size: string) => void;
}) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  // useIsomorphicLayoutEffect - SSR 안전한 레이아웃 측정
  useIsomorphicLayoutEffect(() => {
    if (element) {
      const { width, height } = element.getBoundingClientRect();
      onMeasure(`${width.toFixed(0)}px × ${height.toFixed(0)}px`);
    }
  }, [element, onMeasure]);

  return (
    <div
      ref={setElement}
      className="rounded bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white"
    >
      <p className="text-xl font-bold">측정 대상 요소</p>
      <p className="mt-2 text-sm opacity-90">
        useIsomorphicLayoutEffect로 크기를 측정합니다
      </p>
    </div>
  );
}

export default function IsomorphicLayoutEffectPage() {
  const [size, setSize] = useState("측정 전");
  const [logs, setLogs] = useState<string[]>([]);
  const [showComponent, setShowComponent] = useState(false);

  const handleMeasure = (newSize: string) => {
    setSize((prev) => {
      if (prev === newSize) return prev; // ✅ 동일하면 업데이트 안 함
      return newSize;
    });

    setLogs((prev) => {
      const timestamp = new Date().toLocaleTimeString();
      const last = prev[prev.length - 1];
      const msg = `✓ 요소 크기 측정: ${newSize} (${timestamp})`;
      if (last === msg) return prev; // (선택) 같은 로그 중복 방지
      return [...prev, msg];
    });
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
        <h1 className="mb-2 text-3xl font-bold">useIsomorphicLayoutEffect</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          서버 사이드 렌더링(SSR)에서 안전하게 동작하는 레이아웃 effect입니다.
          DOM 측정, 레이아웃 조정에 사용됩니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          컴포넌트를 마운트하면 레이아웃 측정이 실행됩니다.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowComponent(!showComponent)}>
              {showComponent ? "컴포넌트 숨기기" : "컴포넌트 표시"}
            </Button>
            <div className="rounded bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                측정된 크기:{" "}
              </span>
              <span className="font-bold">{size}</span>
            </div>
          </div>

          <div className="min-h-[120px]">
            {showComponent ? (
              <MeasureComponent onMeasure={handleMeasure} />
            ) : (
              <div className="flex h-[120px] items-center justify-center rounded border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                <p className="text-sm text-zinc-500">
                  버튼을 클릭하여 컴포넌트를 표시하세요
                </p>
              </div>
            )}
          </div>

          {logs.length > 0 && (
            <div className="rounded bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                📋 측정 로그
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

          <div className="rounded bg-blue-50 p-4 dark:bg-blue-950">
            <p className="mb-2 text-sm font-semibold text-blue-800 dark:text-blue-300">
              💡 useLayoutEffect vs useIsomorphicLayoutEffect
            </p>
            <div className="space-y-2 text-xs text-blue-700 dark:text-blue-400">
              <p>
                <strong>useLayoutEffect:</strong> 브라우저에서만 동작, SSR 시
                경고 발생
              </p>
              <p>
                <strong>useIsomorphicLayoutEffect:</strong> SSR에서는
                useEffect로, 브라우저에서는 useLayoutEffect로 동작
              </p>
              <p className="mt-2 rounded bg-blue-100 p-2 dark:bg-blue-900">
                Next.js와 같은 SSR 환경에서 레이아웃 측정이 필요할 때
                필수적입니다.
              </p>
            </div>
          </div>

          <div className="rounded bg-amber-50 p-4 dark:bg-amber-950">
            <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
              ⚠️ 사용 시 주의사항
            </p>
            <ul className="list-inside list-disc space-y-1 text-xs text-amber-700 dark:text-amber-400">
              <li>DOM 측정이 필요한 경우에만 사용</li>
              <li>과도한 사용 시 성능 저하 가능</li>
              <li>일반적인 부수 효과는 useEffect 사용</li>
            </ul>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>DOM 요소 크기 측정</li>
              <li>스크롤 위치 계산</li>
              <li>툴팁 위치 조정</li>
              <li>레이아웃 기반 애니메이션</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`import { useIsomorphicLayoutEffect } from '@/hooks';

function TooltipComponent() {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (element) {
      // DOM 측정 - SSR에서도 안전
      const { width, height } = element.getBoundingClientRect();
      console.log('Size:', width, height);
      
      // 레이아웃 조정
      adjustPosition(width, height);
    }
  }, [element]);

  return <div ref={setElement}>Tooltip</div>;
}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
