"use client";

import Link from "next/link";

import {
  Clock,
  Copy,
  Database,
  Eye,
  Gauge,
  Heart,
  Monitor,
  MousePointer,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  Scroll,
  Timer,
  ToggleLeft,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface HookCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: "타이밍" | "브라우저 API" | "DOM" | "상태 관리" | "라이프사이클";
}

const hooks: HookCard[] = [
  // 타이밍 훅 (4개)
  {
    title: "useDebounce",
    description:
      "입력값을 일정 시간 지연시켜 업데이트합니다. 검색 최적화에 적합합니다.",
    href: "/examples/debounce",
    icon: <Clock className="h-6 w-6" />,
    category: "타이밍",
  },
  {
    title: "useThrottle",
    description:
      "일정 시간 간격으로만 값을 업데이트합니다. 스크롤 이벤트 최적화에 유용합니다.",
    href: "/examples/throttle",
    icon: <Gauge className="h-6 w-6" />,
    category: "타이밍",
  },
  {
    title: "useTimeout",
    description: "일정 시간 후 함수를 실행하는 타이머를 관리합니다.",
    href: "/examples/timeout",
    icon: <Timer className="h-6 w-6" />,
    category: "타이밍",
  },
  {
    title: "useInterval",
    description:
      "일정 시간 간격으로 함수를 반복 실행합니다. 타이머, 폴링에 활용됩니다.",
    href: "/examples/interval",
    icon: <Repeat className="h-6 w-6" />,
    category: "타이밍",
  },

  // 브라우저 API 훅 (5개)
  {
    title: "useLocalStorage",
    description:
      "로컬스토리지와 동기화되는 상태를 관리합니다. 페이지를 새로고침해도 값이 유지됩니다.",
    href: "/examples/local-storage",
    icon: <Database className="h-6 w-6" />,
    category: "브라우저 API",
  },
  {
    title: "useMediaQuery",
    description: "CSS 미디어 쿼리를 감지하여 반응형 UI를 구현합니다.",
    href: "/examples/media-query",
    icon: <Monitor className="h-6 w-6" />,
    category: "브라우저 API",
  },
  {
    title: "useWindowSize",
    description: "브라우저 윈도우의 크기를 실시간으로 추적합니다.",
    href: "/examples/window-size",
    icon: <Monitor className="h-6 w-6" />,
    category: "브라우저 API",
  },
  {
    title: "useScrollPosition",
    description:
      "페이지의 스크롤 위치를 실시간으로 추적합니다. 진행률 바, 'Top으로' 버튼에 활용됩니다.",
    href: "/examples/scroll-position",
    icon: <Scroll className="h-6 w-6" />,
    category: "브라우저 API",
  },
  {
    title: "useCopyToClipboard",
    description: "텍스트를 클립보드에 복사하는 기능을 제공합니다.",
    href: "/examples/copy",
    icon: <Copy className="h-6 w-6" />,
    category: "브라우저 API",
  },

  // DOM 관련 훅 (2개)
  {
    title: "useClickOutside",
    description:
      "요소 외부 클릭을 감지합니다. 드롭다운, 모달을 닫을 때 유용합니다.",
    href: "/examples/click-outside",
    icon: <MousePointer className="h-6 w-6" />,
    category: "DOM",
  },
  {
    title: "useIntersectionObserver",
    description:
      "요소가 뷰포트에 보이는지 감지합니다. 무한 스크롤, 이미지 지연 로딩에 활용됩니다.",
    href: "/examples/intersection",
    icon: <Eye className="h-6 w-6" />,
    category: "DOM",
  },

  // 상태 관리 훅 (2개)
  {
    title: "useToggle",
    description:
      "boolean 값을 쉽게 토글할 수 있습니다. 스위치, 모달, 메뉴에 유용합니다.",
    href: "/examples/toggle",
    icon: <ToggleLeft className="h-6 w-6" />,
    category: "상태 관리",
  },
  {
    title: "usePrevious",
    description:
      "이전 렌더링의 값을 추적합니다. 값 변화 감지, 애니메이션에 유용합니다.",
    href: "/examples/previous",
    icon: <TrendingUp className="h-6 w-6" />,
    category: "상태 관리",
  },

  // 라이프사이클 훅 (4개)
  {
    title: "useMount",
    description:
      "컴포넌트가 마운트될 때 한 번만 실행됩니다. 초기 데이터 로딩에 유용합니다.",
    href: "/examples/mount",
    icon: <Play className="h-6 w-6" />,
    category: "라이프사이클",
  },
  {
    title: "useUnmount",
    description: "컴포넌트가 언마운트될 때 정리 작업을 수행합니다.",
    href: "/examples/unmount",
    icon: <Pause className="h-6 w-6" />,
    category: "라이프사이클",
  },
  {
    title: "useUpdateEffect",
    description: "마운트 시에는 실행되지 않고, 업데이트 시에만 실행됩니다.",
    href: "/examples/update-effect",
    icon: <RotateCcw className="h-6 w-6" />,
    category: "라이프사이클",
  },
  {
    title: "useIsomorphicLayoutEffect",
    description:
      "SSR에서 안전하게 동작하는 레이아웃 effect입니다. DOM 측정에 사용됩니다.",
    href: "/examples/isomorphic-layout-effect",
    icon: <Zap className="h-6 w-6" />,
    category: "라이프사이클",
  },
];

const categoryColors = {
  타이밍: "from-blue-500 to-cyan-500",
  "브라우저 API": "from-purple-500 to-pink-500",
  DOM: "from-green-500 to-emerald-500",
  "상태 관리": "from-orange-500 to-red-500",
  라이프사이클: "from-indigo-500 to-violet-500",
};

export default function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Custom Hooks Examples</h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          실전에서 바로 사용 가능한 17개의 커스텀 훅 컬렉션입니다.
          <br />각 훅은 인터랙티브한 데모와 코드 예제를 제공합니다.
        </p>
      </div>

      {/* Category Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(categoryColors).map(([category, gradient]) => {
          const count = hooks.filter(
            (hook) => hook.category === category
          ).length;
          return (
            <div
              key={category}
              className={`rounded-lg bg-gradient-to-br ${gradient} p-4 text-white shadow-lg`}
            >
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm opacity-90">{category}</p>
            </div>
          );
        })}
      </div>

      {/* Hook Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hooks.map((hook) => (
          <Link key={hook.href} href={hook.href}>
            <Card className="group h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`rounded-lg bg-gradient-to-br ${categoryColors[hook.category]} p-3 text-white shadow-md transition-transform group-hover:scale-110`}
                  >
                    {hook.icon}
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {hook.category}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {hook.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {hook.description}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                  데모 보기
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
        <Heart className="mx-auto mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-bold">더 많은 훅이 필요하신가요?</h2>
        <p className="mb-4 opacity-90">
          hooks/ 디렉토리에서 소스 코드를 확인하고 프로젝트에 맞게
          커스터마이징하세요.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-transform hover:scale-105"
        >
          GitHub에서 보기
        </a>
      </div>
    </div>
  );
}
