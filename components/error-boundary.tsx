"use client";

import React from "react";

import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>오류가 발생했습니다</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-4">
                {this.state.error?.message || "알 수 없는 오류가 발생했습니다."}
              </p>
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false })}
              >
                다시 시도
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
