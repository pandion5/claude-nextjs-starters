"use client";

import Link from "next/link";

import { useToggle } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TogglePage() {
  const [isOn, toggleIsOn, setIsOn] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(true);
  const [notifications, toggleNotifications, setNotifications] =
    useToggle(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useToggle</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          boolean 값을 쉽게 토글할 수 있는 훅입니다. 스위치, 모달, 메뉴 등에
          유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          boolean 값을 쉽게 토글할 수 있습니다.
        </p>

        <div className="space-y-6">
          {/* Basic Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">기본 토글</span>
              <div
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  isOn ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
                onClick={toggleIsOn}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    isOn ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
            <p className="text-sm text-zinc-500">상태: {isOn ? "ON" : "OFF"}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setIsOn(true)}>
                ON으로 설정
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOn(false)}
              >
                OFF로 설정
              </Button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">다크 모드</span>
              <div
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  isDarkMode ? "bg-indigo-600" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
                onClick={toggleDarkMode}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    isDarkMode ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
            <p className="text-sm text-zinc-500">
              {isDarkMode ? "🌙 다크 모드" : "☀️ 라이트 모드"}
            </p>
          </div>

          {/* Notifications Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">알림</span>
              <div
                className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                  notifications
                    ? "bg-green-600"
                    : "bg-zinc-300 dark:bg-zinc-600"
                }`}
                onClick={toggleNotifications}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notifications ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
            <p className="text-sm text-zinc-500">
              {notifications ? "🔔 알림 활성화" : "🔕 알림 비활성화"}
            </p>
          </div>

          <div className="rounded border p-3 text-sm">
            <p className="mb-2 font-medium">현재 상태</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>기본 토글: {isOn ? "ON" : "OFF"}</li>
              <li>다크 모드: {isDarkMode ? "ON" : "OFF"}</li>
              <li>알림: {notifications ? "ON" : "OFF"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const [isOn, toggle, setIsOn] = useToggle(false);

// 토글
<button onClick={toggle}>Toggle</button>

// 명시적 설정
<button onClick={() => setIsOn(true)}>Turn On</button>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
