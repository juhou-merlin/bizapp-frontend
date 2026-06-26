'use client';

/**
 * プロジェクト管理ページ
 * バックエンドAPIからプロジェクトデータを取得・登録・削除する
 */
import { useEffect, useState } from 'react';

interface Project {
  id: number;
  projectCode: string;
  name: string;
  clientName: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emptyForm = { projectCode: '', name: '', clientName: '', department: '開発部', status: '計画中', startDate: '', endDate: '' };
  const [form, setForm] = useState(emptyForm);

  /* プロジェクト一覧を取得 */
  const fetchProjects = () => {
    setLoading(true);
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { setProjects(data); setError(''); })
      .catch(e => setError(`プロジェクトデータの取得に失敗しました: ${e.message}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProjects(); }, []);

  /* 新規登録 */
  const handleCreate = () => {
    setSubmitting(true);
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(() => {
        setShowForm(false);
        setForm(emptyForm);
        fetchProjects();
      })
      .catch(e => alert(`登録に失敗しました: ${e.message}`))
      .finally(() => setSubmitting(false));
  };

  /* 削除 */
  const handleDelete = (id: number, name: string) => {
    if (!confirm(`「${name}」を削除してもよろしいですか？`)) return;
    fetch(`/api/projects/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        fetchProjects();
      })
      .catch(e => alert(`削除に失敗しました: ${e.message}`));
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '進行中': return 'badge-progress';
      case '完了': return 'badge-complete';
      case '計画中': return 'badge-pending';
      case '保留': return 'badge-hold';
      default: return '';
    }
  };

  const statusCounts = {
    total: projects.length,
    active: projects.filter(p => p.status === '進行中').length,
    planned: projects.filter(p => p.status === '計画中').length,
    done: projects.filter(p => p.status === '完了').length,
  };

  return (
    <>
      <div className="page-header">
        <h1>プロジェクト管理</h1>
        <p>プロジェクトの進捗状況を一覧で確認できます（バックエンドAPI連携）</p>
      </div>

      {/* エラー表示 */}
      {error && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', color: '#742a2a', fontSize: '14px' }}>
          ❌ {error}
        </div>
      )}

      {/* ステータスサマリー */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue">📁</div>
          <div className="stat-info">
            <h3>全プロジェクト</h3>
            <div className="value">{loading ? '—' : statusCounts.total}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🔄</div>
          <div className="stat-info">
            <h3>進行中</h3>
            <div className="value">{loading ? '—' : statusCounts.active}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">📝</div>
          <div className="stat-info">
            <h3>計画中</h3>
            <div className="value">{loading ? '—' : statusCounts.planned}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">✅</div>
          <div className="stat-info">
            <h3>完了</h3>
            <div className="value">{loading ? '—' : statusCounts.done}</div>
          </div>
        </div>
      </div>

      <div className="card">
        {/* ヘッダー */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>プロジェクト一覧</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 24px', backgroundColor: showForm ? '#e53e3e' : 'var(--accent)', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            {showForm ? '× キャンセル' : '+ 新規プロジェクト'}
          </button>
        </div>

        {/* 新規登録フォーム */}
        {showForm && (
          <div style={{
            padding: '20px', marginBottom: '20px', borderRadius: '8px',
            backgroundColor: '#f7fafc', border: '1px solid var(--border)',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>プロジェクト新規登録</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { key: 'projectCode', label: 'プロジェクトコード', placeholder: '例: PRJ006', type: 'text' },
                { key: 'name', label: 'プロジェクト名', placeholder: '例: 新規サービス開発', type: 'text' },
                { key: 'clientName', label: 'クライアント名', placeholder: '例: 株式会社GHI', type: 'text' },
                { key: 'department', label: '担当部署', placeholder: '例: 開発部', type: 'text' },
                { key: 'startDate', label: '開始日', placeholder: '', type: 'date' },
                { key: 'endDate', label: '終了予定日', placeholder: '', type: 'date' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>ステータス</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}
                >
                  <option value="計画中">計画中</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                  <option value="保留">保留</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleCreate}
              disabled={submitting || !form.projectCode || !form.name}
              style={{
                marginTop: '16px', padding: '10px 32px', backgroundColor: '#38a169', color: 'white',
                border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? '登録中...' : '登録する'}
            </button>
          </div>
        )}

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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>読込中...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>プロジェクトデータがありません</td></tr>
            ) : (
              projects.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.projectCode}</td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.clientName}</td>
                  <td>{p.department}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(p.status)}`}>{p.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.startDate}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.endDate}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      style={{
                        padding: '4px 12px', backgroundColor: 'transparent', color: '#e53e3e',
                        border: '1px solid #fed7d7', borderRadius: '4px', fontSize: '12px', cursor: 'pointer',
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
