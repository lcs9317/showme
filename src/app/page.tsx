"use client";

import { useMemo, useState, ReactNode } from "react";

type TabKey = "overview" | "tech" | "arch" | "troubleshooting" | "performance";

export default function PortfolioPage() {
  const [tab, setTab] = useState<TabKey>("overview");

  const content = useMemo(() => {
    switch (tab) {
      case "overview":
        return (
          <Section>
            <H2>개요</H2>
            <DL>
              <DT>이름</DT><DD>이찬수</DD>
              <DT>작성일</DT><DD>2025.10.22</DD>
              <DT>프로젝트</DT><DD>ReLife</DD>
              <DT>역할</DT><DD>백엔드(Node.js)</DD>
              <DT>요약</DT>
              <DD>
                ReLife는 <b>사용자 생활 패턴/이력</b>을 바탕으로 <b>루틴 복구 및 동기부여</b>를 돕는 서비스입니다.
                저는 <b>Node.js 기반 백엔드</b>를 맡아 인증/도메인 API/배포 파이프라인을 담당했습니다.
              </DD>
            </DL>
          </Section>
        );

      case "tech":
        return (
          <Section>
            <H2>기술 & 빌드</H2>
            <Card title="스택">
              <UL>
                <LI>Node.js (Express/Nest 중 사용 프레임워크), TypeScript</LI>
                <LI>DB: (MySQL/PostgreSQL/MongoDB 중 선택) + ORM (Prisma/TypeORM)</LI>
                <LI>캐시/큐: (Redis, Bull 등 사용 시)</LI>
                <LI>테스트: Jest + Supertest</LI>
              </UL>
            </Card>
            <Card title="빌드/배포">
              <UL>
                <LI>CI/CD: GitHub Actions (빌드/테스트/배포)</LI>
                <LI>배포: (AWS EC2/Elastic Beanstalk/Render 등) + Docker</LI>
                <LI>관측: 구조화 로그 & Health Check</LI>
              </UL>
            </Card>
            <Card title="주요 기능(백엔드)">
              <UL>
                <LI>인증: JWT/OAuth (리프레시, 재발급, 만료 전략)</LI>
                <LI>루틴/활동 도메인 API: CRUD + Validation + 표준 에러</LI>
                <LI>파일 업로드: (S3/Cloud Storage) Presigned URL</LI>
              </UL>
            </Card>
          </Section>
        );

      case "arch":
        return (
          <Section>
            <H2>아키텍처</H2>
            <Card title="구조">
              <UL>
                <LI>레이어드: Controller → Service → Repository</LI>
                <LI>DTO / Schema 검증: Zod / class-validator</LI>
                <LI>에러 핸들링: 공통 Error 타입 + 글로벌 필터</LI>
                <LI>설정 분리: .env.dev / .env.prod & Config 모듈</LI>
              </UL>
            </Card>
            <Card title="데이터 모델(예시)">
              <UL>
                <LI>User(계정/권한) ↔ Routine(반복 작업) ↔ Activity(단일 활동)</LI>
                <LI>집계 테이블로 통계(주/월 단위)</LI>
              </UL>
            </Card>
          </Section>
        );

      case "troubleshooting":
        return (
          <Section>
            <H2>트러블슈팅</H2>
            <Card title="1) N+1 쿼리로 인한 응답 지연">
              <P>
                활동 목록 API에서 사용자별 하위 데이터가 반복 조회되어 <b>N+1</b> 발생.
                <br />→ <b>조인 + 배치 조회</b>로 전환하고 선택 필드만 조회하여 <b>쿼리 수 ~70% 절감</b>.
              </P>
            </Card>
            <Card title="2) 파일 업로드에서 서버 부하">
              <P>
                서버 직접 업로드로 메모리 피크 발생.
                <br />→ <b>클라이언트 → S3 Presigned URL</b>로 변경, 서버는 메타데이터만 처리.
              </P>
            </Card>
            <Card title="3) 동시성에서 토큰 재발급 레이스">
              <P>
                동시에 요청 시 리프레시 토큰이 중복 발급되는 이슈.
                <br />→ 토큰 버전 필드와 <b>원자적 갱신</b>으로 단일 유효 토큰만 유지.
              </P>
            </Card>
          </Section>
        );

      case "performance":
        return (
          <Section>
            <H2>성능 개선 & 지표</H2>
            <Card title="API 성능">
              <UL>
                <LI>핵심 API p95: <b>450ms → 180ms</b> (캐싱 + 인덱스 최적화)</LI>
                <LI>DB 쿼리 수: <b>-68%</b> (선택 필드/프리로드 최적화)</LI>
              </UL>
            </Card>
            <Card title="안정성/운영">
              <UL>
                <LI>에러율: <b>-60%</b> (에러 표준화 & 재시도 정책)</LI>
                <LI>릴리즈 리드타임: <b>1.5일 → 0.5일</b> (CI 병렬화/자동화)</LI>
              </UL>
            </Card>
            <Card title="개인 기여 포인트">
              <UL>
                <LI>백엔드 구조 설계 및 인증 파이프라인 주도</LI>
                <LI>운영 자동화(테스트/배포) 도입으로 팀 생산성 향상</LI>
              </UL>
            </Card>
          </Section>
        );
    }
  }, [tab]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-wood-900">
          이찬수의 포트폴리오
        </h1>
        <p className="text-sm text-wood-600 mt-1">
          작성일: 2025.10.22 · 프로젝트: ReLife · 역할: Node.js
        </p>
      </header>

      {/* 탭 */}
      <nav
        role="tablist"
        className="flex flex-wrap gap-2 border-b border-wood-200 pb-3 mb-6"
      >
        <TabBtn active={tab === "overview"} onClick={() => setTab("overview")}>개요</TabBtn>
        <TabBtn active={tab === "tech"} onClick={() => setTab("tech")}>기술 & 빌드</TabBtn>
        <TabBtn active={tab === "arch"} onClick={() => setTab("arch")}>아키텍처</TabBtn>
        <TabBtn active={tab === "troubleshooting"} onClick={() => setTab("troubleshooting")}>트러블슈팅</TabBtn>
        <TabBtn active={tab === "performance"} onClick={() => setTab("performance")}>성능 개선 & 성과</TabBtn>
      </nav>

      {/* 콘텐츠 */}
      <div key={tab} className="fade-in">
        {content}
      </div>
    </div>
  );
}

/* ---------- 재사용 UI 컴포넌트들 ---------- */

function TabBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={[
        "px-3 py-1.5 rounded-md text-sm transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-wood-400",
        active
          ? "bg-wood-800 text-white"
          : "text-wood-800 hover:bg-wood-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <section className="space-y-6">{children}</section>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-wood-900">{children}</h2>;
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-wood-200 p-5 shadow-sm bg-white/80 backdrop-blur-sm">
      <h3 className="font-semibold mb-3 text-wood-900">{title}</h3>
      <div className="text-sm sm:text-base text-wood-900/90">{children}</div>
    </div>
  );
}

function DL({ children }: { children: ReactNode }) {
  // grid-cols-[120px_1fr] 로 고정 & 적절한 간격
  return (
    <dl className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-2">
      {children}
    </dl>
  );
}
function DT({ children }: { children: ReactNode }) {
  return <dt className="text-wood-700 font-medium">{children}</dt>;
}
function DD({ children }: { children: ReactNode }) {
  return <dd className="text-wood-900/90">{children}</dd>;
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1">{children}</ul>;
}
function LI({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}
function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}
