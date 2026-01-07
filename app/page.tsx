import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container flex flex-col items-center gap-6 py-24 md:py-32">
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Next.js Modern Starter Kit
            </h1>
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              빠르게 웹 개발을 시작하세요. TypeScript, Tailwind CSS, Zustand,
              TanStack Query가 모두 준비되어 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>

        <section className="container py-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="⚡ 빠른 시작"
              description="2-3일 걸리던 보일러플레이트 설정을 30분 이내로 단축"
            />
            <FeatureCard
              title="🎨 모던 스택"
              description="Next.js 16, React 19, TypeScript, Tailwind CSS v4"
            />
            <FeatureCard
              title="🪝 커스텀 훅"
              description="usehooks-ts 스타일의 재사용 가능한 25+ 커스텀 훅"
            />
            <FeatureCard
              title="📦 상태 관리"
              description="Zustand (클라이언트) + TanStack Query (서버)"
            />
            <FeatureCard
              title="🎯 타입 안전"
              description="TypeScript strict 모드 + Zod 런타임 검증"
            />
            <FeatureCard
              title="🛠️ DX 최적화"
              description="ESLint, Prettier, Husky로 코드 품질 보장"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
