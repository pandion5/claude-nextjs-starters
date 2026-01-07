# Next.js Modern Starter Kit

> 빠르게 웹 개발을 시작하세요. TypeScript, Tailwind CSS, Zustand, TanStack Query가 모두 준비되어 있습니다.

## ✨ 주요 기능

- ⚡ **Next.js 16** - App Router, React Server Components
- 🎨 **Tailwind CSS v4** - 최신 CSS 프레임워크
- 🎯 **TypeScript** - 타입 안전성
- 📦 **상태 관리** - Zustand (클라이언트) + TanStack Query (서버)
- 🪝 **25+ 커스텀 훅** - usehooks-ts 스타일
- 🎨 **shadcn/ui** - 아름다운 UI 컴포넌트
- 🌓 **다크모드** - next-themes 기반
- 📝 **폼 검증** - React Hook Form + Zod
- 🛠️ **DX 최적화** - ESLint, Prettier, VS Code 설정

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

### 3. 환경변수 설정

`.env.example`을 복사하여 `.env.local`을 생성하고 필요한 값을 설정하세요.

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router
├── components/             # React 컴포넌트
│   ├── layout/            # Header, Footer
│   ├── providers/         # Context Providers
│   └── ui/                # shadcn/ui 컴포넌트
├── config/                # 설정 파일
├── hooks/                 # 커스텀 훅 (20+)
├── lib/                   # 유틸리티
├── store/                 # Zustand 스토어
└── types/                 # TypeScript 타입
```

## 🪝 커스텀 훅

- **타이밍**: useDebounce, useThrottle, useTimeout, useInterval
- **브라우저 API**: useLocalStorage, useMediaQuery, useWindowSize
- **DOM**: useClickOutside, useIntersectionObserver
- **상태**: useToggle, usePrevious
- **라이프사이클**: useMount, useUnmount, useUpdateEffect

## 🛠️ 개발 도구

```bash
npm run format        # 코드 포맷팅
npm run format:check  # 포맷 체크
npm run lint          # 린트
```

## 📖 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://zustand-demo.pmnd.rs)
- [TanStack Query](https://tanstack.com/query)
