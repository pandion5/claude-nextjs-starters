"use client";

import Link from "next/link";

import { useLocalStorage } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LocalStoragePage() {
  const [name, setName] = useLocalStorage("user-name", "");
  const [theme, setTheme] = useLocalStorage("user-theme", "light");
  const [count, setCount] = useLocalStorage("counter", 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useLocalStorage</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          브라우저의 localStorage와 동기화되는 상태를 관리합니다. 페이지를
          새로고침해도 값이 유지됩니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          페이지를 새로고침해도 값이 유지됩니다.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="mt-1 text-xs text-zinc-400">
              localStorage 키: &quot;user-name&quot;
            </p>
          </div>

          <div>
            <Label>테마 선택</Label>
            <div className="mt-2 flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                라이트
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                다크
              </Button>
              <Button
                variant={theme === "auto" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("auto")}
              >
                자동
              </Button>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              localStorage 키: &quot;user-theme&quot;
            </p>
          </div>

          <div>
            <Label>카운터</Label>
            <div className="mt-2 flex items-center gap-4">
              <Button onClick={() => setCount(count - 1)}>-</Button>
              <span className="text-2xl font-bold">{count}</span>
              <Button onClick={() => setCount(count + 1)}>+</Button>
              <Button variant="outline" onClick={() => setCount(0)}>
                리셋
              </Button>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              localStorage 키: &quot;counter&quot;
            </p>
          </div>

          <div className="rounded border p-3 text-sm">
            <p className="mb-2 font-medium">저장된 값</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>이름: {name || "(없음)"}</li>
              <li>테마: {theme}</li>
              <li>카운터: {count}</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [name, setName] = useLocalStorage('user-name', '');
const [theme, setTheme] = useLocalStorage('user-theme', 'light');

// 자동으로 localStorage에 저장되고 불러옵니다`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
