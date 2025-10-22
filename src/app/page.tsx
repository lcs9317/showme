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
              <DT>역할</DT><DD>백엔드(Java Spring)</DD>
              <DT>요약</DT>
              <DD>
                ReLife는 <b>사용자의 기존 인생</b>을 바탕으로 <b>다른 삶을 살았다면 어땠을까</b>를 알아보는 서비스입니다.
                <br></br>이 프로젝트는 <b>Java Spring 기반 프로젝트</b> 이며 
                저의 역할은 <b>백엔드 팀장</b>을 맡아 Node API와 AI 선택지, 보안을 담당했습니다.
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
                <LI>Java Spring, Next.Js, TypeScript, React</LI>
                <LI>DB: PostgreSQL + Hibernate</LI>
                <LI>캐시: Redis</LI>
                <LI>테스트: Junit</LI>
              </UL>
            </Card>
            <Card title="빌드/배포">
              <UL>
                <LI>CI/CD: GitHub Actions (빌드/테스트/배포)</LI>
                <LI>배포: AWS(EC2/Elastic, 아우로라(PostgreSQL), S3, CloudFront) + Docker + nginx</LI>
                <LI>관측: Health Check</LI>
              </UL>
            </Card>
            <Card title="주요 기능(백엔드)">
              <UL>
                <LI>인증: Session/OAuth (Redis를 통한 갱신, TTL 전략)</LI>
                <LI>Node 도메인 API: CRUD + Validation</LI>
                <LI>이미지: S3와 연결된 CDN URL</LI>
              </UL>
            </Card>
          </Section>
        );

      case "arch":
        return (
          <Section>
            <H2>아키텍처</H2>

            <Card title="요약">
              <UL>
                <LI>프런트엔드: <b>Vercel</b>에 <b>Next.js</b> 호스팅 (FORK 동기화)</LI>
                <LI>정적 자산: <b>S3</b> 저장 → <b>CloudFront</b>(<code>cdn.relife.kr</code>) 배포, <b>ACM</b> TLS</LI>
                <LI>백엔드: <b>EC2</b>(Seoul) + <b>Docker</b>, <b>Nginx Proxy Manager</b> 앞단, <b>Spring Boot</b> 애플리케이션</LI>
                <LI>데이터: <b>PostgreSQL</b> (RDB) · <b>Redis</b> (캐시/세션/레이트리밋)</LI>
                <LI>보안: <b>Spring Security</b> + <b>OAuth2</b>, 전 구간 HTTPS(<code>api.relife.kr</code>)</LI>
                <LI>AI 연동: <b>Gemini API</b>(텍스트) · <b>Stable Diffusion API</b>(이미지)</LI>
                <LI>DevOps: <b>GitHub Actions</b> Blue/Green, <b>Terraform</b>으로 IaC</LI>
              </UL>
            </Card>

            <Card title="트래픽 흐름">
              <UL>
                <LI>사용자 → <code>api.relife.kr</code>(<b>Vercel(Next.js)</b>) → <b>EC2</b>(Nginx → Spring Boot)</LI>
                <LI>정적 파일/이미지: 클라이언트 → <b>CloudFront(cdn.relife.kr)</b> → <b>S3</b> </LI>
              </UL>
            </Card>

            <Card title="백엔드 구성 (AWS · Seoul)">
              <UL>
                <LI><b>Nginx Proxy Manager</b>: 도메인 라우팅/HTTPS 종단, 리버스 프록시</LI>
                <LI><b>Spring Boot</b>: 도메인 API, <b>Spring Security + OAuth2</b> 인증</LI>
                <LI><b>Redis</b>: 세션/토큰 블랙리스트/레이트 리밋/캐시</LI>
                <LI><b>PostgreSQL</b>: 영속 데이터베이스</LI>
                <LI><b>S3</b>: AI로 생성한 이미지 업로드 및 캐싱</LI>
              </UL>
            </Card>

            <Card title="CI/CD & 인프라">
              <UL>
                <LI><b>GitHub Actions</b>: 프런트(Vercel 프리뷰→프로덕션), 백엔드(Docker 빌드→EC2 Blue/Green)</LI>
                <LI><b>Terraform</b>: EC2/S3/CloudFront/ACM 등 인프라 선언적 관리</LI>
                <LI><b>ACM</b>: 인증서 발급/갱신, CloudFront·프록시 HTTPS 적용</LI>
              </UL>
            </Card>

            <Card title="보안 포인트">
              <UL>
                <LI>전 구간 <b>HTTPS</b> 강제(<code>cdn.relife.kr</code>, <code>api.relife.kr</code>, <code>www.relife.kr</code>)</LI>
                <LI><b>OAuth2</b> 로그인, 역할 기반 접근 제어</LI>
                <LI>Nginx에서 기본 <b>Rate Limit</b>/헤더 보안, CORS 정책</LI>
                <LI><b>DSC(Double Submit Cookie)</b>를 통한 <b>CSRF</b>방어 및 <b>CSP(content security policy)</b>를 통한 <b>XSS</b>방어</LI>
              </UL>
            </Card>

            <Card title="AI 접목">
              <UL>
                <LI><b>Gemini API</b>: 텍스트/시나리오 생성</LI>
                <LI><b>Stable Diffusion API</b>: 이미지 생성 파이프라인</LI>
              </UL>
            </Card>
          </Section>
        );

      case "troubleshooting":
        return (
          <Section>
            <H2>트러블슈팅</H2>

            <Card title="1) 프런트 협업 부재로 트리 UI 왜곡">
              <P>
                초기에 트리 출력 로직이 <b>일자형 나열</b>로만 보이는 문제가 있었음.
                프런트와 사용성 관점이 어긋나 <b>무엇을 숨기고/드러낼지 기준이 부재</b>했다.
                <br />→ 프런트 담당자와 합의해 각 노드에 <b>표현 속성</b>(가시/비가시, 앵커/프렐류드 등)을 부여하고,
                렌더 단계에서 <b>숨김·노출 규칙</b>을 분리하여 문제 해결.
              </P>
            </Card>

            <Card title="2) AI 컨텍스트 비대화로 응답 15s+ 지연">
              <P>
                프롬프트 컨텍스트가 비대해져 <b>응답 지연(15s+)</b> 발생.
                <br />→ 배포 담당과 협의해 <b>PostgreSQL + VectorDB</b> 도입,
                시드를 <b>단어/토픽 단위</b>로 저장 후 <b>유사도 검색</b>으로 필요한 문맥만 주입.
                그 결과 <b>다양성</b>을 유지하면서도 <b>지연 시간을 대폭 단축</b>.
              </P>
            </Card>

            <Card title="3) 동기화 폭증(O(m·n)) 문제">
              <P>
                세계선(m) × 노드(n) 동기화가 <b>O(m·n)</b>으로 기하급수적으로 증가.
                <br />→ <b>DVCS형 구조</b>로 전환해 결정라인이 <b>최신 노드 버전(commit)을 참조</b>하도록 설계.
                동기화는 <b>변경분</b>만 처리되어 실효 복잡도가 <b>O(N)</b> 수준으로 축소.
              </P>
            </Card>

            <Card title="4) 보안 기본선 강화(CSRF/XSS)">
              <P>
                초기엔 CSRF/XSS에 대한 방어선이 불충분.
                <br />→ <b>CSRF 토큰</b> 적용 및 <b>CSP</b> 정책 도입으로
                스크립트 인젝션·크로스사이트 요청 위조 리스크를 완화.
              </P>
            </Card>
          </Section>
        );


      case "performance":
        return (
          <Section>
            <H2>성능 개선 & 지표</H2>

            <Card title="동기화 복잡도 개선">
              <UL>
                <LI>
                  세계선(m) × 노드(n) 동기화: <b>O(m·n)</b> ⟶
                  <b> O(N)</b> (DVCS형 <i>commit reference</i>로 최신 노드만 추적)
                </LI>
                <LI>
                  라인 복제 대신 <b>버전 참조</b>와 <b>변경분 반영</b>으로 동기화 비용 급감
                </LI>
              </UL>
            </Card>

            <Card title="AI 응답시간 단축">
              <UL>
                <LI>
                  컨텍스트 비대화로 <b>~15초</b>까지 늘던 응답 ⟶
                  <b> ~5초(±)</b> 수준으로 단축
                </LI>
                <LI>
                  <b>VectorDB 유사도 검색</b> 기반 <b>필요 문맥만 주입</b>하여
                  품질과 지연 시간을 동시 개선
                </LI>
              </UL>
            </Card>

            <Card title="운영/보안 품질선">
              <UL>
                <LI>CSRF 토큰 + <b>CSP</b> 정책으로 기본 보안선 강화</LI>
                <LI>프런트 협업을 통한 <b>렌더 규칙 분리</b>로 UI 일관성 향상</LI>
              </UL>
            </Card>

            <Card title="향후 개선 계획">
              <UL>
                <LI>
                  <b>옵션 수정(선택지 수정)</b> 워크플로 완성 ⟶ DVCS 장점 극대화
                </LI>
                <LI>
                  AI 추론 파라미터(<code>topK</code>, <code>topP</code>, <code>temperature</code>) 튜닝으로
                  <b>품질↔지연</b> 최적점 탐색
                </LI>
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
          작성일: 2025.10.22 · 프로젝트: ReLife · 역할: 팀장(백엔드)
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
