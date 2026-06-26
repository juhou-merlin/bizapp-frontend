/**
 * ダッシュボードページ
 * 業務管理システムのトップページ。主要KPIと最近のアクティビティを表示する。
 */
export default function DashboardPage() {
  return (
    <>
      <div className="page-header">
        <h1>ダッシュボード</h1>
        <p>業務の全体状況を確認できます</p>
      </div>

      {/* KPI カード */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <h3>総社員数</h3>
            <div className="value">48</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">📋</div>
          <div className="stat-info">
            <h3>進行中プロジェクト</h3>
            <div className="value">12</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">✅</div>
          <div className="stat-info">
            <h3>今月完了タスク</h3>
            <div className="value">87</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">📈</div>
          <div className="stat-info">
            <h3>出勤率</h3>
            <div className="value">96.2%</div>
          </div>
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
          最近のアクティビティ
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { time: '10:30', text: '田中太郎が「基幹システム刷新」の進捗を更新しました', type: 'プロジェクト' },
            { time: '09:45', text: '佐藤花子が新しいタスクを作成しました', type: 'タスク' },
            { time: '09:15', text: '鈴木一郎が出勤を記録しました', type: '勤怠' },
            { time: '昨日', text: '高橋美咲が「ECサイト構築」のレビューを完了しました', type: 'プロジェクト' },
            { time: '昨日', text: '伊藤健太が社内ポータルの改修提案を提出しました', type: '提案' },
          ].map((activity, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 0',
              borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                minWidth: '48px',
              }}>
                {activity.time}
              </span>
              <span style={{ fontSize: '14px', flex: 1 }}>{activity.text}</span>
              <span className="badge badge-progress" style={{ fontSize: '11px' }}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
