import { useEffect, useState } from 'react';
import { GetDashboardSummary, type DashboardSummary } from '../../application/use-cases/dashboard/GetDashboardSummary';
import { useAuth } from '../../app/providers/AuthProvider';
import { ChatIcon, FileIcon, RefreshIcon, ShieldIcon, TransferIcon } from '../components/common/Icons';
import { Loading } from '../components/common/Loading';

const useCase = new GetDashboardSummary();

export function DashboardPage() {
  const { session } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { setSummary(await useCase.execute()); } finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  return <div className="page">
    <header className="page-header"><div><span className="eyebrow">لوحة التحكم</span><h1>أهلاً، {session?.fullName}</h1><p>ملخص مباشر للمهام الإدارية التي تحتاج انتباهك.</p></div><button className="secondary-button" onClick={load}><RefreshIcon />تحديث</button></header>
    {loading && !summary ? <Loading /> : <>
      <section className="stat-grid">
        <article className="stat-card"><div className="stat-icon"><TransferIcon /></div><div><span>تحويلات معلقة</span><strong>{summary?.pendingTransfers ?? 0}</strong></div></article>
        <article className="stat-card"><div className="stat-icon"><FileIcon /></div><div><span>ملفات KYC</span><strong>{summary?.pendingKycFiles ?? 0}</strong></div></article>
        <article className="stat-card"><div className="stat-icon"><ChatIcon /></div><div><span>محادثات الدعم</span><strong>{summary?.supportConversations ?? 0}</strong></div></article>
        <article className="stat-card"><div className="stat-icon"><ShieldIcon /></div><div><span>خدمة الإشعارات</span><strong className={summary?.notificationService === 'online' ? 'online-text' : 'offline-text'}>{summary?.notificationService === 'online' ? 'تعمل' : 'غير متاحة'}</strong></div></article>
      </section>
      <section className="panel"><div className="panel-header"><div><h2>حالة جلسة الإدارة</h2><p>البيانات مأخوذة من JWT الصادر عن IAM.</p></div><span className="status-badge success">ADMIN</span></div>
        <div className="detail-grid"><div><span>معرّف الإدارة</span><code>{session?.userId}</code></div><div><span>انتهاء الجلسة</span><strong>{session?.expiresAt ? new Date(session.expiresAt).toLocaleString('ar') : '—'}</strong></div><div className="full"><span>الصلاحيات</span><div className="chip-list">{session?.permissions.map((p) => <span key={p}>{p}</span>)}</div></div></div>
      </section>
    </>}
  </div>;
}
