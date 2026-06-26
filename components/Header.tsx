/**
 * ヘッダーコンポーネント
 * ページ上部に表示される共通ヘッダー（ユーザー情報・通知等）
 */
export function Header() {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 32px',
      gap: '16px',
    }}>
      {/* 通知アイコン */}
      <button style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '8px',
        borderRadius: '8px',
      }}>
        🔔
      </button>

      {/* ユーザー情報 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 700,
        }}>
          管
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>管理者</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>admin@example.com</div>
        </div>
      </div>
    </header>
  );
}
