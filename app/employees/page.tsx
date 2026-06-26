'use client';

/**
 * 社員管理ページ
 * バックエンドAPIから社員データを取得・登録・削除する
 */
import { useEffect, useState } from 'react';

interface Employee {
  id: number;
  employeeCode: string;
  name: string;
  department: string;
  position: string;
  email: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* 初期値付きフォーム */
  const emptyForm = { employeeCode: '', name: '', department: '開発部', position: '', email: '', status: '在籍' };
  const [form, setForm] = useState(emptyForm);

  /* 社員一覧を取得 */
  const fetchEmployees = () => {
    setLoading(true);
    fetch('/api/employees')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { setEmployees(data); setError(''); })
      .catch(e => setError(`社員データの取得に失敗しました: ${e.message}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEmployees(); }, []);

  /* 新規登録 */
  const handleCreate = () => {
    setSubmitting(true);
    fetch('/api/employees', {
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
        fetchEmployees();
      })
      .catch(e => alert(`登録に失敗しました: ${e.message}`))
      .finally(() => setSubmitting(false));
  };

  /* 削除 */
  const handleDelete = (id: number, name: string) => {
    if (!confirm(`「${name}」を削除してもよろしいですか？`)) return;
    fetch(`/api/employees/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        fetchEmployees();
      })
      .catch(e => alert(`削除に失敗しました: ${e.message}`));
  };

  return (
    <>
      <div className="page-header">
        <h1>社員管理</h1>
        <p>社員情報の一覧表示・登録・削除を行います（バックエンドAPI連携）</p>
      </div>

      {/* エラー表示 */}
      {error && (
        <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', color: '#742a2a', fontSize: '14px' }}>
          ❌ {error}
        </div>
      )}

      <div className="card">
        {/* ヘッダー */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {loading ? '読込中...' : `全 ${employees.length} 件`}
          </span>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '10px 24px', backgroundColor: showForm ? '#e53e3e' : 'var(--accent)', color: 'white',
              border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            {showForm ? '× キャンセル' : '+ 新規登録'}
          </button>
        </div>

        {/* 新規登録フォーム */}
        {showForm && (
          <div style={{
            padding: '20px', marginBottom: '20px', borderRadius: '8px',
            backgroundColor: '#f7fafc', border: '1px solid var(--border)',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>社員新規登録</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { key: 'employeeCode', label: '社員番号', placeholder: '例: EMP009' },
                { key: 'name', label: '氏名', placeholder: '例: 山田 太郎' },
                { key: 'department', label: '部署', placeholder: '例: 開発部' },
                { key: 'position', label: '役職', placeholder: '例: エンジニア' },
                { key: 'email', label: 'メール', placeholder: '例: yamada@example.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>{f.label}</label>
                  <input
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>状態</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', backgroundColor: 'white' }}
                >
                  <option value="在籍">在籍</option>
                  <option value="休職">休職</option>
                  <option value="退職">退職</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleCreate}
              disabled={submitting || !form.employeeCode || !form.name}
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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>読込中...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>社員データがありません</td></tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{emp.employeeCode}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{emp.email}</td>
                  <td>
                    <span className={`badge ${emp.status === '在籍' ? 'badge-active' : 'badge-inactive'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(emp.id, emp.name)}
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
