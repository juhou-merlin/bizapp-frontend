'use client';

/**
 * ダッシュボードページ
 * バックエンドAPIから集計データを取得して表示する
 * データ取得に成功すれば、フロントエンド⇔バックエンドの疎通が確認できる
 */
import { useEffect, useState } from 'react';

interface DashboardData {
  totalEmployees: number;
  activeEmployees: number;
  totalProjects: number;
  activeProjects: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => { setData(json); setStatus('ok'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>ダッシュボード</h1>
        <p>業務の全体状況を確認できます</p>
      </div>

      {/* API接続ステータス表示（デプロイ検証用） */}
      <div style={{
        padding: '16px 20px',
        borderRadius: '8px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        backgroundColor: status === 'ok' ? '#f0fff4' : status === 'error' ? '#fff5f5' : '#f7fafc',
        border: `1px solid ${status === 'ok' ? '#c6f6d5' : status === 'error' ? '#fed7d7' : '#e2e8f0'}`,
        color: status === 'ok' ? '#22543d' : status === 'error' ? '#742a2a' : '#4a5568',
      }}>
        <span style={{ fontSize: '20px' }}>
          {status === 'ok' ? '✅' : status === 'error' ? '❌' : '⏳'}
        </span>
        <div>
          <strong>バックエンドAPI接続: </strong>
          {status === 'loading' && '接続確認中...'}
          {status === 'ok' && '正常 — フロントエンドとバックエンドの疎通が確認できました'}
          {status === 'error' && '失敗 — バックエンドAPIに接続できません。バックエンドPodが起動しているか確認してください'}
        </div>
      </div>

      {/* KPI カード */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <h3>総社員数</h3>
            <div className="value">{data ? data.totalEmployees : '—'}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🏢</div>
          <div className="stat-info">
            <h3>在籍社員数</h3>
            <div className="value">{data ? data.activeEmployees : '—'}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📋</div>
          <div className="stat-info">
            <h3>全プロジェクト</h3>
            <div className="value">{data ? data.totalProjects : '—'}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">🔄</div>
          <div className="stat-info">
            <h3>進行中プロジェクト</h3>
            <div className="value">{data ? data.activeProjects : '—'}</div>
          </div>
        </div>
      </div>

      {/* デプロイ検証チェックリスト */}
      <div className="card">
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>
          デプロイ検証チェックリスト
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'フロントエンドの表示', ok: true, desc: 'このページが表示されていれば成功' },
            { label: 'バックエンドAPI接続', ok: status === 'ok', desc: 'ダッシュボードの数値が表示されていれば成功' },
            { label: '社員データの取得', ok: status === 'ok' && data !== null && data.totalEmployees > 0, desc: '「社員管理」ページで一覧が表示されれば成功' },
            { label: 'プロジェクトデータの取得', ok: status === 'ok' && data !== null && data.totalProjects > 0, desc: '「プロジェクト管理」ページで一覧が表示されれば成功' },
            { label: 'データ登録', ok: null, desc: '各ページの「新規登録」ボタンで登録できれば成功' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: item.ok === true ? '#f0fff4' : item.ok === false ? '#fff5f5' : '#f7fafc',
              border: `1px solid ${item.ok === true ? '#c6f6d5' : item.ok === false ? '#fed7d7' : '#e2e8f0'}`,
            }}>
              <span style={{ fontSize: '18px' }}>
                {item.ok === true ? '✅' : item.ok === false ? '❌' : '⬜'}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
