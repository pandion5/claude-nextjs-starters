"use client";

import { useRef, useState } from "react";

import Link from "next/link";

import { useClickOutside } from "@/hooks";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ClickOutsidePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      setClickCount((prev) => prev + 1);
    }
  });

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setClickCount((prev) => prev + 1);
    }
  });

  useClickOutside(menuRef as React.RefObject<HTMLElement>, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setClickCount((prev) => prev + 1);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/examples">
        <Button variant="outline" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Examples로 돌아가기
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">useClickOutside</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          요소 외부 클릭을 감지합니다. 드롭다운, 모달, 사이드 메뉴를 닫을 때
          유용합니다.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">인터랙티브 데모</h3>
        <p className="mb-4 text-sm text-zinc-500">
          요소 외부를 클릭하면 자동으로 닫힙니다.
        </p>

        <div className="space-y-6">
          {/* Click Counter */}
          <div className="rounded bg-blue-50 p-4 text-center dark:bg-blue-950">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              외부 클릭 감지 횟수
            </p>
            <p className="mt-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {clickCount}
            </p>
          </div>

          {/* Dropdown Demo */}
          <div className="relative">
            <p className="mb-2 text-sm font-medium">1. 드롭다운 메뉴</p>
            <div ref={dropdownRef}>
              <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                드롭다운 열기 {isDropdownOpen ? "▲" : "▼"}
              </Button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg dark:bg-zinc-900">
                  <button className="w-full rounded px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    메뉴 1
                  </button>
                  <button className="w-full rounded px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    메뉴 2
                  </button>
                  <button className="w-full rounded px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    메뉴 3
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal Demo */}
          <div>
            <p className="mb-2 text-sm font-medium">2. 모달 창</p>
            <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div
                  ref={modalRef}
                  className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-900"
                >
                  <h4 className="mb-2 text-lg font-semibold">모달 제목</h4>
                  <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                    모달 외부를 클릭하면 자동으로 닫힙니다.
                  </p>
                  <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
                </div>
              </div>
            )}
          </div>

          {/* Side Menu Demo */}
          <div>
            <p className="mb-2 text-sm font-medium">3. 사이드 메뉴</p>
            <Button onClick={() => setIsMenuOpen(true)}>
              사이드 메뉴 열기
            </Button>
            {isMenuOpen && (
              <div className="fixed inset-0 z-50 flex bg-black/50">
                <div
                  ref={menuRef}
                  className="h-full w-64 bg-white p-6 shadow-xl dark:bg-zinc-900"
                >
                  <h4 className="mb-4 text-lg font-semibold">메뉴</h4>
                  <ul className="space-y-2">
                    <li className="cursor-pointer rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      홈
                    </li>
                    <li className="cursor-pointer rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      대시보드
                    </li>
                    <li className="cursor-pointer rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      설정
                    </li>
                    <li className="cursor-pointer rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      로그아웃
                    </li>
                  </ul>
                  <Button
                    className="mt-6"
                    variant="outline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    닫기
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded border p-3 text-sm">
            <p className="mb-2 font-medium">사용 사례</p>
            <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>드롭다운 메뉴 닫기</li>
              <li>모달 다이얼로그 닫기</li>
              <li>사이드 네비게이션 닫기</li>
              <li>툴팁/팝오버 닫기</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="mb-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            코드 예제
          </p>
          <pre className="overflow-x-auto text-xs">
            <code>{`const ref = useRef<HTMLDivElement>(null);
const [isOpen, setIsOpen] = useState(false);

useClickOutside(ref, () => {
  setIsOpen(false);
});

<div ref={ref}>
  {isOpen && <Dropdown />}
</div>`}</code>
          </pre>
        </div>
      </Card>
    </div>
  );
}
