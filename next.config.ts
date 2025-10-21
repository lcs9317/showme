// next.config.ts
import type { NextConfig } from "next";

const repo = "showme"; // 레포 이름
const isGH = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // GitHub Pages용 핵심: 정적 사이트로 내보내기
  output: "export",
  // 프로젝트 페이지: /<repo> 경로 하위에서 열림
  basePath: isGH ? `/${repo}` : "",
  assetPrefix: isGH ? `/${repo}/` : "",
  // 새로고침 404 방지/상대경로 안전
  trailingSlash: true,
  // next/image 정적화
  images: { unoptimized: true },
};

export default nextConfig;
