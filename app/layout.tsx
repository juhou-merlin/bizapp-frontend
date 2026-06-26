/**
 * ルートレイアウト
 * 全ページ共通のサイドバーとヘッダーを含むレイアウトコンポーネント
 */
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export const metadata = {
  title: '業務管理システム',
  description: '社内業務を一元管理するポータルシステム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content">
            <Header />
            <main className="page-content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
