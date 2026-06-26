'use client';

/**
 * サイドバーコンポーネント
 * アプリケーション全体のナビゲーションメニューを表示する
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'ダッシュボード', icon: '📊' },
  { href: '/employees', label: '社員管理', icon: '👥' },
  { href: '/projects', label: 'プロジェクト管理', icon: '📋' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      backgroundColor: 'var(--primary)',
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* アプリケーションロゴ */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>
          業務管理システム
        </h1>
        <p style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>
          Business Management Portal
        </p>
      </div>

      {/* ナビゲーションメニュー */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '4px',
                textDecoration: 'none',
                color: 'white',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                transition: 'background-color 0.15s ease',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* フッター情報 */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '11px',
        opacity: 0.5,
      }}>
        v0.1.0 — サンプルアプリ
      </div>
    </aside>
  );
}
