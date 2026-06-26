/**
 * プロジェクト管理ページ
 * プロジェクト一覧の表示と管理を行うページ
 * バックエンドAPIからプロジェクトデータを取得して表示する
 */
export default function ProjectsPage() {
  /* サンプルデータ（本番ではAPIから取得） */
  const projects = [
    { id: 1, code: 'PRJ001', name: '基幹システム刷新', client: '株式会社ABC', department: '開発部', status: '進行中', start: '2026-01-15', end: '2026-09-30' },
    { id: 2, code: 'PRJ002', name: 'ECサイト構築', client: '株式会社XYZ', department: '開発部', status: '進行中', start: '2026-03-01', end: '2026-12-31' },
    { id: 3, code: 'PRJ003', name: '社内ポータル改修', client: '自社', department: '開発部', status: '計画中', start: '2026-07-01', end: '2026-10-31' },
    { id: 4, code: 'PRJ004', name: '営業支援ツール導入', client: '自社', department: '営業部', status: '完了', start: '2025-10-01', end: '2026-03-31' },
    { id: 5, code: 'PRJ005', name: 'データ分析基盤構築', client: '株式会社DEF', department: '開発部', status: '進行中', start: '2026-04-01', end: '2027-03-31' },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '進行中': return 'badge-progress';
      case '完了': return 'badge-complete';
      case '計画中': return 'badge-pending';
      case '保留': return 'badge-hold';
      default: return '';
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>プロジェクト管理</h1>
        <p>プロジェクトの進捗状況を一覧で確認できます</p>
      </div>

      {/* プロジェクトステータスサマリー */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue">📁</div>
          <div className="stat-info">
            <h3>全プロジェクト</h3>
            <div className="value">{projects.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🔄</div>
          <div className="stat-info">
            <h3>進行中</h3>
            <div className="value">{projects.filter(p => p.status === '進行中').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">📝</div>
          <div className="stat-info">
            <h3>計画中</h3>
            <div className="value">{projects.filter(p => p.status === '計画中').length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">✅</div>
          <div className="stat-info">
            <h3>完了</h3>
            <div className="value">{projects.filter(p => p.status === '完了').length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        {/* 操作エリア */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>プロジェクト一覧</h2>
          <button style={{
            padding: '10px 24px',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            + 新規プロジェクト
          </button>
        </div>

        {/* プロジェクトテーブル */}
        <table className="data-table">
          <thead>
            <tr>
              <th>コード</th>
              <th>プロジェクト名</th>
              <th>クライアント</th>
              <th>担当部署</th>
              <th>ステータス</th>
              <th>開始日</th>
              <th>終了予定日</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{project.code}</td>
                <td style={{ fontWeight: 500 }}>{project.name}</td>
                <td>{project.client}</td>
                <td>{project.department}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{project.start}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{project.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
