"use client";

import Link from "next/link";

import { useMediaQuery } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function MediaQueryItem({
  label,
  isActive,
  query,
}: {
  label: string;
  isActive: boolean;
  query: string;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded border-2 p-3 transition-colors ${
        isActive
          ? "border-green-500 bg-green-50 dark:bg-green-950"
          : "border-zinc-200 dark:border-zinc-700"
      }`}
    >
      <div>
        <p className="font-medium">{label}</p>
        <code className="text-xs text-zinc-500">{query}</code>
      </div>
      <div
        className={`h-3 w-3 rounded-full ${
          isActive ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
      />
    </div>
  );
}

export default function MediaQueryPage() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  const getCurrentDevice = () => {
    if (isMobile) return "📱 모바일";
    if (isTablet) return "📱 태블릿";
    if (isDesktop) return "💻 데스크톱";
    return "알 수 없음";
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
        <h1 className="mb-2 text-3xl font-bold">useMediaQuery</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          CSS 미디어 쿼리를 감지하여 반응형 UI를 구현합니다. 브레이크포인트,
          다크모드, 화면 방향 등을 감지할 수 있습니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          창 크기를 조절하여 반응형 변화를 확인하세요.
        </p>

        <div className="space-y-4">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center text-white">
            <p className="text-3xl font-bold">{getCurrentDevice()}</p>
            <p className="mt-2 text-sm opacity-90">현재 디바이스</p>
          </div>

          <div className="grid gap-3">
            <MediaQueryItem
              label="모바일 (≤640px)"
              isActive={isMobile}
              query="(max-width: 640px)"
            />
            <MediaQueryItem
              label="태블릿 (641px - 1024px)"
              isActive={isTablet}
              query="(min-width: 641px) and (max-width: 1024px)"
            />
            <MediaQueryItem
              label="데스크톱 (≥1025px)"
              isActive={isDesktop}
              query="(min-width: 1025px)"
            />
            <MediaQueryItem
              label="다크 모드 선호"
              isActive={isDark}
              query="(prefers-color-scheme: dark)"
            />
            <MediaQueryItem
              label="세로 방향"
              isActive={isPortrait}
              query="(orientation: portrait)"
            />
          </div>

          <div
            className={`rounded border-2 p-4 text-center transition-colors ${
              isMobile
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : isTablet
                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                  : "border-purple-500 bg-purple-50 dark:bg-purple-950"
            }`}
          >
            <p className="font-medium">
              {isMobile
                ? "모바일 전용 콘텐츠"
                : isTablet
                  ? "태블릿 전용 콘텐츠"
                  : "데스크톱 전용 콘텐츠"}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              디바이스에 따라 다른 내용을 표시할 수 있습니다
            </p>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const isMobile = useMediaQuery('(max-width: 640px)');
const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');

{isMobile && <MobileView />}
{isDesktop && <DesktopView />}`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
