# taeho-world — 개인 포트폴리오 웹사이트

## 프로젝트 개요

태호의 개인 포트폴리오 사이트. 경력, 프로젝트, 메모/블로그를 포함하는 다중 페이지 웹 애플리케이션.

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| UI Components | shadcn/ui |
| State | Zustand (필요시) |
| Content | MDX |
| Deploy | Vercel |

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
├── components/
│   ├── ui/               # shadcn/ui 기반 공용 컴포넌트
│   └── myUI/             # 프로젝트 전용 커스텀 컴포넌트
├── layouts/              # 레이아웃 컴포넌트
├── hooks/                # 커스텀 React 훅
├── lib/                  # 유틸리티 라이브러리 (cn, fetcher 등)
├── constants/            # 상수 및 포트폴리오 데이터
├── types/                # TypeScript 타입 정의
├── store/                # Zustand 스토어
├── assets/               # 이미지, 폰트 등 정적 자산
└── utils/                # 범용 유틸리티 함수
```

## 핵심 명령어

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run type-check   # TypeScript 타입 검사
```

## 코딩 컨벤션

- **컴포넌트**: 함수형 컴포넌트 + hooks 패턴, `export default` 사용
- **스타일링**: Tailwind 유틸리티 클래스 우선, `cn()` 함수로 조건부 클래스 병합
- **타입**: 인터페이스보다 `type` 선호, Props는 컴포넌트 파일 상단에 정의
- **임포트**: 절대 경로 `@/` alias 사용 (예: `@/components/ui/button`)
- **파일 네이밍**: 컴포넌트는 PascalCase, 유틸리티는 camelCase, 상수는 UPPER_SNAKE_CASE
- **모듈 시스템**: ES Modules 사용, CommonJS 금지

## Agent 위임 구조

이 프로젝트는 `.claude/agents/`에 정의된 전문 서브에이전트를 사용한다.
각 에이전트의 역할은 해당 에이전트 정의 파일을 참조할 것.

| Agent | 역할 |
|-------|------|
| `ui-builder` | UI 컴포넌트 구현, 레이아웃, 애니메이션, 스타일링 |
| `content-architect` | 콘텐츠 구조, 포트폴리오 데이터, MDX, SEO |
| `qa-reviewer` | 코드 리뷰, 접근성, 성능, 보안 검토 |

## 주의사항

- `src/components/ui/` 내 shadcn/ui 컴포넌트는 직접 수정하지 않는다
- 애니메이션은 Framer Motion의 `motion` 컴포넌트를 사용한다
- 이미지는 Next.js `<Image>` 컴포넌트를 반드시 사용한다
- 반응형 디자인은 모바일 퍼스트로 구현한다 (sm → md → lg → xl)
