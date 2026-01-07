"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpIcon,
  DollarSignIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock API responses
const fetchDashboardStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    users: { total: 12453, change: 12.5 },
    revenue: { total: 245678, change: 8.3 },
    orders: { total: 3421, change: -2.4 },
    growth: { total: 23.5, change: 5.2 },
  };
};

const fetchRecentActivity = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [
    { id: 1, user: "김철수", action: "새 주문 생성", time: "2분 전" },
    { id: 2, user: "이영희", action: "프로필 업데이트", time: "15분 전" },
    { id: 3, user: "박민수", action: "결제 완료", time: "23분 전" },
    { id: 4, user: "정수진", action: "상품 리뷰 작성", time: "1시간 전" },
    { id: 5, user: "최동욱", action: "회원 가입", time: "2시간 전" },
  ];
};

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  const {
    data: activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: fetchRecentActivity,
  });

  if (statsError || activitiesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-red-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
          <Button onClick={() => refetchStats()} className="mt-4">
            다시 시도
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchStats()}
          disabled={statsLoading}
        >
          <RefreshCwIcon
            className={`mr-2 h-4 w-4 ${statsLoading ? "animate-spin" : ""}`}
          />
          새로고침
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="총 사용자"
          value={stats?.users.total}
          change={stats?.users.change}
          icon={UsersIcon}
          loading={statsLoading}
        />
        <StatCard
          title="총 매출"
          value={stats?.revenue.total}
          change={stats?.revenue.change}
          icon={DollarSignIcon}
          loading={statsLoading}
          prefix="₩"
        />
        <StatCard
          title="총 주문"
          value={stats?.orders.total}
          change={stats?.orders.change}
          icon={ShoppingCartIcon}
          loading={statsLoading}
        />
        <StatCard
          title="성장률"
          value={stats?.growth.total}
          change={stats?.growth.change}
          icon={TrendingUpIcon}
          loading={statsLoading}
          suffix="%"
        />
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">최근 활동</h2>
        {activitiesLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {activities?.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 border-b border-zinc-200 pb-3 last:border-0 dark:border-zinc-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                    {activity.user[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {activity.user}{" "}
                    <span className="text-zinc-500">{activity.action}</span>
                  </p>
                  <p className="text-xs text-zinc-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// StatCard Component
interface StatCardProps {
  title: string;
  value?: number;
  change?: number;
  icon: React.ElementType;
  loading: boolean;
  prefix?: string;
  suffix?: string;
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  loading,
  prefix = "",
  suffix = "",
}: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
          {loading ? (
            <div className="mt-2 h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          ) : (
            <p className="mt-2 text-2xl font-bold">
              {prefix}
              {value?.toLocaleString()}
              {suffix}
            </p>
          )}
          {loading ? (
            <div className="mt-2 h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          ) : (
            <p
              className={`mt-1 flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
            >
              <ArrowUpIcon
                className={`mr-1 h-3 w-3 ${isPositive ? "" : "rotate-180"}`}
              />
              {Math.abs(change ?? 0)}% {isPositive ? "증가" : "감소"}
            </p>
          )}
        </div>
        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
      </div>
    </Card>
  );
}
