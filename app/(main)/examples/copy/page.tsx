"use client";

import Link from "next/link";

import { useCopyToClipboard } from "@/hooks";
import { ArrowLeft, CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CopyPage() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const sampleTexts = [
    "npm install @tanstack/react-query",
    "https://github.com/username/repository",
    "const [state, setState] = useState(initialValue);",
    "안녕하세요! 클립보드 복사 데모입니다.",
  ];

  const handleCopy = (text: string) => {
    copyToClipboard(text);
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
        <h1 className="mb-2 text-3xl font-bold">useCopyToClipboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          텍스트를 클립보드에 복사하는 기능을 제공합니다. 코드 스니펫, URL,
          텍스트 공유에 유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          클릭하여 텍스트를 클립보드에 복사하세요.
        </p>

        <div className="space-y-4">
          {sampleTexts.map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded border p-3"
            >
              <code className="flex-1 overflow-x-auto text-sm">{text}</code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(text)}
                className="shrink-0"
              >
                {copiedText === text ? (
                  <>
                    <CheckIcon className="mr-1 h-4 w-4 text-green-600" />
                    복사됨
                  </>
                ) : (
                  <>
                    <CopyIcon className="mr-1 h-4 w-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
          ))}

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">커스텀 텍스트 복사</p>
            <div className="flex gap-2">
              <Input
                placeholder="복사할 텍스트 입력..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCopy(e.currentTarget.value);
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  const input = e.currentTarget
                    .previousElementSibling as HTMLInputElement;
                  if (input.value) {
                    handleCopy(input.value);
                  }
                }}
              >
                복사
              </Button>
            </div>
          </div>

          {copiedText && (
            <div className="rounded bg-green-50 p-4 dark:bg-green-950">
              <p className="mb-1 text-sm font-medium text-green-800 dark:text-green-300">
                ✓ 클립보드에 복사되었습니다!
              </p>
              <code className="text-xs text-green-700 dark:text-green-400">
                {copiedText}
              </code>
            </div>
          )}
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [copiedText, copyToClipboard] = useCopyToClipboard();

const handleCopy = (text: string) => {
  copyToClipboard(text);
};

<button onClick={() => handleCopy('Hello World!')}>
  {copiedText ? 'Copied!' : 'Copy'}
</button>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
