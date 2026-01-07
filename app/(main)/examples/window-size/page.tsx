"use client";

import Link from "next/link";

import { useWindowSize } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between rounded border p-2 text-sm">
      <span className="text-zinc-600 dark:text-zinc-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function BreakpointIndicator({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
      />
    </div>
  );
}

export default function WindowSizePage() {
  const { width, height } = useWindowSize();

  const getDeviceType = () => {
    if (!width) return "Unknown";
    if (width < 640) return "Mobile";
    if (width < 1024) return "Tablet";
    return "Desktop";
  };

  const getOrientation = () => {
    if (!width || !height) return "Unknown";
    return width > height ? "Landscape" : "Portrait";
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
        <h1 className="mb-2 text-3xl font-bold">useWindowSize</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          브라우저 윈도우의 크기를 실시간으로 추적합니다. 반응형 레이아웃, 차트
          크기 조정 등에 활용됩니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          브라우저 창 크기를 조절하여 실시간 변화를 확인하세요.
        </p>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-center text-white">
              <p className="text-4xl font-bold">{width ?? "?"}px</p>
              <p className="mt-2 text-sm opacity-90">Width</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-center text-white">
              <p className="text-4xl font-bold">{height ?? "?"}px</p>
              <p className="mt-2 text-sm opacity-90">Height</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm">
            <InfoRow label="디바이스 타입" value={getDeviceType()} />
            <InfoRow label="화면 방향" value={getOrientation()} />
            <InfoRow
              label="종횡비"
              value={
                width && height ? `${(width / height).toFixed(2)}:1` : "N/A"
              }
            />
            <InfoRow
              label="총 픽셀"
              value={
                width && height
                  ? `${(width * height).toLocaleString()} px²`
                  : "N/A"
              }
            />
          </div>

          <div className="rounded border p-4">
            <p className="mb-2 font-medium">브레이크포인트 상태</p>
            <div className="space-y-2">
              <BreakpointIndicator
                label="Mobile (< 640px)"
                isActive={!!width && width < 640}
              />
              <BreakpointIndicator
                label="Tablet (640px - 1024px)"
                isActive={!!width && width >= 640 && width < 1024}
              />
              <BreakpointIndicator
                label="Desktop (≥ 1024px)"
                isActive={!!width && width >= 1024}
              />
              <BreakpointIndicator
                label="Large Desktop (≥ 1536px)"
                isActive={!!width && width >= 1536}
              />
            </div>
          </div>

          <div className="rounded border-2 border-dashed p-4 text-center">
            <p className="text-2xl">
              {width && width < 640
                ? "📱"
                : width && width < 1024
                  ? "📱"
                  : "💻"}
            </p>
            <p className="mt-2 font-medium">{getDeviceType()} View</p>
            <p className="text-xs text-zinc-500">
              {width}px × {height}px
            </p>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const { width, height } = useWindowSize();

// 반응형 로직
if (width < 640) {
  return <MobileLayout />;
}
return <DesktopLayout />;`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
