import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://taeho.world";
const SITE_NAME = "TAEHO.WORLD";
const TITLE = "TAEHO.WORLD | 프론트엔드 엔지니어 포트폴리오";
const DESCRIPTION =
  "5년+ 경력 프론트엔드 엔지니어 태호의 포트폴리오. React, TypeScript, Next.js, Three.js 전문. S2W, Innodep, Tmax AI, Deepixel에서 보안 인텔리전스, 스마트시티, AI 챗봇, AR 가상 피팅 등 다양한 도메인 프로젝트 수행.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "프론트엔드 엔지니어",
    "Frontend Engineer",
    "React 개발자",
    "TypeScript",
    "Next.js",
    "Three.js",
    "포트폴리오",
    "프론트엔드 포트폴리오",
    "React Native",
    "웹 개발자",
    "S2W",
    "보안 인텔리전스",
    "스마트시티",
    "AR",
    "WebGL",
  ],
  authors: [{ name: "Taeho", url: SITE_URL }],
  creator: "Taeho",
  publisher: "Taeho",

  // Canonical & alternates
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ko-KR": SITE_URL,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAEHO.WORLD — 프론트엔드 엔지니어 포트폴리오",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@taeho",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (placeholder — replace with actual IDs)
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  // },

  // Category
  category: "technology",

  // Other
  other: {
    "naver-site-verification": "", // 네이버 서치어드바이저 인증코드
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050a08" },
    { media: "(prefers-color-scheme: light)", color: "#050a08" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data for SEO & GEO
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Taeho",
    url: SITE_URL,
    jobTitle: "Frontend Engineer",
    description:
      "5년+ 경력의 프론트엔드 엔지니어. React, TypeScript, Next.js, Three.js 전문.",
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Three.js",
      "React Native",
      "Angular",
      "Vue",
      "Node.js",
      "WebGL",
      "WebRTC",
    ],
    worksFor: {
      "@type": "Organization",
      name: "S2W",
      url: "https://s2w.inc/",
    },
    alumniOf: [
      { "@type": "Organization", name: "Innodep Inc.", url: "https://innodep.co.kr/" },
      { "@type": "Organization", name: "Tmax AI", url: "https://www.tmax.co.kr/tmaxai" },
      { "@type": "Organization", name: "Deepixel", url: "https://www.deepixel.xyz/" },
    ],
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    author: { "@type": "Person", name: "Taeho" },
    inLanguage: "ko-KR",
  };

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "프로젝트 포트폴리오",
    description: "프론트엔드 엔지니어 태호의 주요 프로젝트 목록",
    numberOfItems: 8,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "SAIP",
        description: "고도화된 위협 탐지를 위한 보안 분석 및 인텔리전스 플랫폼",
        url: "https://s2w.inc/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "VUNex AI",
        description: "중소기업을 위한 AI 기반 영상 보안 솔루션",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "VUNex MLOps",
        description: "AI 모델 학습을 위한 영상 어노테이션 플랫폼",
        url: "https://mlops.vunex-cloud.com/",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "스마트시티 통합관제",
        description: "AI 영상 분석 기반 도시 재난 안전 관리 플랫폼",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "RISS",
        description: "전국 대학 연구 논문 공개 접근 AI 기반 학술 플랫폼",
        url: "https://www.riss.kr/",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "HyperChatbot",
        description: "AI와 규칙 기반 접근법을 결합한 지능형 대화형 챗봇",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "StyleAR",
        description: "이커머스를 위한 AR 가상 피팅 솔루션",
        url: "https://www.stylear.ai/",
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "AI Camera",
        description: "분산형 엣지 기반 다중 카메라 영상 처리 솔루션",
      },
    ],
  };

  return (
    <html lang="ko" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(portfolioJsonLd),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1212090887781939"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
