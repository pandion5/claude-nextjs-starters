"use client";

import { useUIStore } from "@/store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * 전역 모달 컴포넌트
 * useUIStore의 모달 상태와 연동되어 동작
 */
export function GlobalModal() {
  const { isModalOpen, modalContent, closeModal } = useUIStore();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>{modalContent}</DialogContent>
    </Dialog>
  );
}
