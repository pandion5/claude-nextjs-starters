"use client";

import { useState } from "react";

import Link from "next/link";

import { useDebounce } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock search results
const mockData = [
  "React Hook Form",
  "React Query",
  "React Router",
  "Redux Toolkit",
  "Recoil",
  "Next.js",
  "Nest.js",
  "Node.js",
  "TypeScript",
  "TailwindCSS",
];

export default function DebouncePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 500);

  const filteredResults = mockData.filter((item) =>
    item.toLowerCase().includes(debouncedValue.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useDebounce</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          입력값이 변경되고 일정 시간이 지난 후에 값을 업데이트합니다. 검색 입력
          최적화에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          입력값이 변경되고 500ms 후에 검색이 실행됩니다.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="search">검색어 입력</Label>
            <Input
              id="search"
              type="text"
              placeholder="라이브러리 이름을 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded border p-3">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                즉시 값
              </p>
              <p className="mt-1 text-zinc-500">
                {searchTerm || "(입력 없음)"}
              </p>
            </div>
            <div className="rounded border p-3">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                디바운스 값
              </p>
              <p className="mt-1 text-zinc-500">
                {debouncedValue || "(입력 없음)"}
              </p>
            </div>
          </div>

          {debouncedValue && (
            <div>
              <p className="mb-2 text-sm font-medium">
                검색 결과 ({filteredResults.length}개)
              </p>
              <div className="space-y-2">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <div
                      key={result}
                      className="rounded border p-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      {result}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-400">검색 결과가 없습니다.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [searchTerm, setSearchTerm] = useState('');
const debouncedValue = useDebounce(searchTerm, 500);

// debouncedValue는 500ms 후에 업데이트됩니다`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
