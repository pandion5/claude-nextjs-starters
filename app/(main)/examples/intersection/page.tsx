"use client";

import Link from "next/link";

import { useIntersectionObserver } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function IntersectionPage() {
  const {
    ref: targetRef,
    isIntersecting,
    entry,
  } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
  });

  const isVisible = isIntersecting;

  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `아이템 ${i + 1}`,
    description: `이것은 ${i + 1}번째 아이템입니다.`,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useIntersectionObserver</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          요소가 뷰포트에 보이는지 감지합니다. 무한 스크롤, 이미지 지연 로딩,
          애니메이션 트리거에 활용됩니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          스크롤하여 타겟 요소가 화면에 보이는지 확인하세요.
        </p>

        <div className="space-y-4">
          <div className="rounded bg-blue-50 p-4 dark:bg-blue-950">
            <p className="text-sm font-medium">
              타겟 요소 상태:{" "}
              <span
                className={
                  isVisible
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {isVisible ? "✓ 화면에 보임" : "✗ 화면에 안 보임"}
              </span>
            </p>
            {entry && (
              <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                <p>
                  Intersection Ratio:{" "}
                  {(entry.intersectionRatio * 100).toFixed(1)}%
                </p>
                <p>Is Intersecting: {entry.isIntersecting ? "Yes" : "No"}</p>
              </div>
            )}
          </div>

          <div className="h-64 overflow-y-auto rounded border">
            <div className="space-y-2 p-4">
              {items.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="rounded border p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.description}</p>
                </div>
              ))}

              {/* Target Element */}
              <div
                ref={targetRef as React.RefObject<HTMLDivElement>}
                className={`rounded border-2 p-4 text-center transition-all ${
                  isVisible
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : "border-red-500 bg-red-50 dark:bg-red-950"
                }`}
              >
                <p className="text-lg font-bold">
                  {isVisible ? "👀 타겟 요소 (보임)" : "🙈 타겟 요소 (안 보임)"}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  스크롤하여 이 요소의 가시성을 변경하세요
                </p>
              </div>

              {items.slice(8).map((item) => (
                <div
                  key={item.id}
                  className="rounded border p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border p-3 text-sm">
            <p className="mb-2 font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>무한 스크롤 구현</li>
              <li>이미지 지연 로딩</li>
              <li>스크롤 애니메이션 트리거</li>
              <li>광고 노출 추적</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const { ref, isIntersecting, entry } = useIntersectionObserver({
  threshold: 0.5,
  rootMargin: '0px',
});

<div ref={ref}>
  {isIntersecting && <Component />}
</div>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
