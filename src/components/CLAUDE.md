# Components 디렉토리

## 구조

- `ui/` — shadcn/ui 기반 컴포넌트. `npx shadcn-ui add`로만 추가. 직접 수정 금지.
- `myUI/` — 프로젝트 전용 커스텀 컴포넌트. `ui/`를 조합하여 구성.

## 규칙

- 모든 컴포넌트는 `className` prop을 받아 외부 스타일 확장을 허용할 것
- `cn()` 유틸리티를 사용해 조건부 클래스를 병합할 것
- Server Component가 기본. 상태/이벤트가 필요한 경우에만 `"use client"` 선언
