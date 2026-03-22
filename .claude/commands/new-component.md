---
description: 새 UI 컴포넌트를 생성 (타입, 스타일, 기본 구조 포함)
allowed-tools: Read, Write, Edit, Glob
---

새 컴포넌트를 생성해줘: $ARGUMENTS

다음 단계를 수행할 것:

1. 컴포넌트 이름과 용도를 분석
2. 적절한 디렉토리에 파일 생성:
   - 공용: `src/components/myUI/`
   - 페이지 전용: 해당 페이지의 `components/` 디렉토리
3. Props 타입 정의
4. Tailwind CSS 스타일링 적용
5. 필요 시 Framer Motion 애니메이션 추가
6. className prop으로 외부 스타일 확장 가능하게 구성

프로젝트의 CLAUDE.md에 정의된 코딩 컨벤션을 따를 것.
