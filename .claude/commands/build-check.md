---
description: 빌드, 린트, 타입 체크를 한 번에 실행하고 결과를 요약
allowed-tools: Bash, Read, Grep
---

다음 명령어를 순서대로 실행하고 결과를 한국어로 요약해줘:

1. `npm run type-check` — TypeScript 타입 에러 확인
2. `npm run lint` — ESLint 린트 검사
3. `npm run build` — 프로덕션 빌드 테스트

각 단계의 성공/실패를 리포트하고, 에러가 있으면 파일명과 라인 번호를 포함해서 알려줘.
