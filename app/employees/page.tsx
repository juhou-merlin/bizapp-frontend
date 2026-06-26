/**
 * 社員管理ページ
 * 社員一覧の表示・検索を行うページ
 * バックエンドAPIから社員データを取得して表示する
 */
export default function EmployeesPage() {
  /* サンプルデータ（本番ではAPIから取得） */
  const employees = [
    { id: 1, code: 'EMP001', name: '田中 太郎', department: '営業部', position: '部長', email: 'tanaka@example.com', status: '在籍' },
    { id: 2, code: 'EMP002', name: '佐藤 花子', department: '開発部', position: 'シニアエンジニア', email: 'sato@example.com', status: '在籍' },
    { id: 3, code: 'EMP003', name: '鈴木 一郎', department: '開発部', position: 'エンジニア', email: 'suzuki@example.com', status: '在籍' },
    { id: 4, code: 'EMP004', name: '高橋 美咲', department: '人事部', position: '課長', email: 'takahashi@example.com', status: '在籍' },
    { id: 5, code: 'EMP005', name: '伊藤 健太', department: '総務部', position: '主任', email: 'ito@example.com', status: '在籍' },
    { id: 6, code: 'EMP006', name: '渡辺 陽子', department: '営業部', position: '営業担当', email: 'watanabe@example.com', status: '在籍' },
    { id: 7, code: 'EMP007', name: '山本 大輔', department: '開発部', position: 'テックリード', email: 'yamamoto@example.com', status: '休職' },
    { id: 8, code: 'EMP008', name: '中村 さくら', department: '経理部', position: '経理担当', email: 'nakamura@example.com', status: '在籍' },
  ];

  return (
    <>
      <div className="page-header">
        <h1>社員管理</h1>
        <p>社員情報の一覧表示・登録・編集を行います</p>
      </div>

      <div className="card">
        {/* 検索・フィルターエリア */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="社員名・社員番号で検索..."
              style={{
                padding: '10px 16px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '14px',
                width: '300px',
                outline: 'none',
              }}
            />
            <select style={{
              padding: '10px 16px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white',
            }}>
              <option value="">全部署</option>
              <option value="営業部">営業部</option>
              <option value="開発部">開発部</option>
              <option value="人事部">人事部</option>
              <option value="総務部">総務部</option>
              <option value="経理部">経理部</option>
            </select>
          </div>
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
            + 新規登録
          </button>
        </div>

        {/* 社員テーブル */}
        <table className="data-table">
          <thead>
            <tr>
              <th>社員番号</th>
              <th>氏名</th>
              <th>部署</th>
              <th>役職</th>
              <th>メール</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{emp.code}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{emp.email}</td>
                <td>
                  <span className={`badge ${emp.status === '在籍' ? 'badge-active' : 'badge-inactive'}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ページネーション */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: 'var(--text-secondary)',
        }}>
          <span>全 {employees.length} 件中 1-{employees.length} 件を表示</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button disabled style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'white', cursor: 'not-allowed', opacity: 0.5 }}>前へ</button>
            <button style={{ padding: '6px 12px', border: '1px solid var(--accent)', borderRadius: '6px', backgroundColor: 'var(--accent)', color: 'white' }}>1</button>
            <button disabled style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', backgroundColor: 'white', cursor: 'not-allowed', opacity: 0.5 }}>次へ</button>
          </div>
        </div>
      </div>
    </>
  );
}
