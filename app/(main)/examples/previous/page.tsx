"use client";

import { useState } from "react";

import Link from "next/link";

import { usePrevious } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PreviousPage() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const previousCount = usePrevious(count);
  const previousName = usePrevious(name);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">usePrevious</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          이전 렌더링의 값을 추적합니다. 값 변화 감지, 애니메이션, 비교 로직에
          유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          값을 변경하면 이전 값과 현재 값을 비교할 수 있습니다.
        </p>

        <div className="space-y-6">
          {/* Counter Demo */}
          <div className="space-y-4">
            <p className="text-sm font-medium">1. 카운터 예제</p>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount((prev) => prev - 1)}>-</Button>
              <span className="text-2xl font-bold">{count}</span>
              <Button onClick={() => setCount((prev) => prev + 1)}>+</Button>
              <Button variant="outline" onClick={() => setCount(0)}>
                리셋
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border-2 border-blue-500 p-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  현재 값
                </p>
                <p className="mt-2 text-4xl font-bold text-blue-600">{count}</p>
              </div>
              <div className="rounded border-2 border-zinc-300 p-4 dark:border-zinc-700">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  이전 값
                </p>
                <p className="mt-2 text-4xl font-bold text-zinc-500">
                  {previousCount ?? "-"}
                </p>
              </div>
            </div>

            {previousCount !== undefined && previousCount !== count && (
              <div className="rounded bg-green-50 p-3 dark:bg-green-950">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                  {count > previousCount
                    ? `📈 ${previousCount}에서 ${count}으로 증가`
                    : `📉 ${previousCount}에서 ${count}으로 감소`}
                </p>
              </div>
            )}
          </div>

          {/* Input Demo */}
          <div className="space-y-4">
            <p className="text-sm font-medium">2. 텍스트 입력 예제</p>
            <Input
              placeholder="이름을 입력하세요..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  현재 입력
                </p>
                <p className="mt-1 font-mono text-lg">
                  {name || <span className="text-zinc-400">(비어있음)</span>}
                </p>
              </div>
              <div className="rounded border p-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  이전 입력
                </p>
                <p className="mt-1 font-mono text-lg text-zinc-500">
                  {previousName || (
                    <span className="text-zinc-400">(비어있음)</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 text-sm font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>값 변화 감지 및 비교</li>
              <li>애니메이션 방향 결정 (증가/감소)</li>
              <li>Undo/Redo 기능 구현</li>
              <li>폼 필드 변경 추적</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [count, setCount] = useState(0);
const previousCount = usePrevious(count);

// 값 변화 감지
if (count > previousCount) {
  console.log('값이 증가했습니다');
}

// 이전 값과 비교
<p>이전: {previousCount} → 현재: {count}</p>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
