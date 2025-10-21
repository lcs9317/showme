import "./globals.css";

export const metadata = {
  title: "이찬수의 포트폴리오",
  description: "ReLife 프로젝트(Node) 중심 포트폴리오",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen wood-bg text-wood-900 antialiased">
        <div className="wood-overlay">{children}</div>
      </body>
    </html>
  );
}
