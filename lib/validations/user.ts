import { z } from "zod";

// 사용자 프로필 스키마
export const userProfileSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  bio: z.string().max(200, "소개는 200자를 초과할 수 없습니다").optional(),
  website: z
    .string()
    .url("유효한 URL을 입력해주세요")
    .optional()
    .or(z.literal("")),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
