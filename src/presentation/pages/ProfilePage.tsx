import { useEffect, useState } from 'react';
import { GetAdminProfile } from '../../application/use-cases/support/SupportUseCases';
import { useAuth } from '../../app/providers/AuthProvider';
import type { AdminProfile } from '../../domain/entities/Support';
import { ApiSupportRepository } from '../../infrastructure/repositories/ApiSupportRepository';
import { RefreshIcon, ShieldIcon, UserIcon } from '../components/common/Icons';
import { Loading } from '../components/common/Loading';

const getProfile = new GetAdminProfile(new ApiSupportRepository());

export function ProfilePage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = async () => { setLoading(true); setError(''); try { setProfile(await getProfile.execute()); } catch (e) { setError(e instanceof Error ? e.message : 'تعذر تحميل الملف'); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);

  return <div className="page"><header className="page-header"><div><span className="eyebrow">الهوية الإدارية</span><h1>ملف الإدارة</h1><p>بيانات JWT وملف الدعم والحسابات المرتبطة.</p></div><button className="secondary-button" onClick={load}><RefreshIcon />تحديث</button></header>{error && <div className="alert error">{error}</div>}{loading ? <Loading /> : <div className="profile-grid"><section className="panel profile-card"><div className="profile-avatar"><UserIcon /></div><h2>{session?.fullName}</h2><p>{session?.email}</p><span className="status-badge success"><ShieldIcon /> ADMIN</span><div className="profile-meta"><div><span>User ID</span><code>{session?.userId}</code></div><div><span>National ID</span><strong>{session?.nationalId || 'غير محدد'}</strong></div></div></section><section className="panel"><div className="panel-header"><div><h2>استجابة Support Profile</h2><p>البيانات المباشرة من Chat Service وAccount Service.</p></div></div><pre className="json-view">{JSON.stringify(profile, null, 2)}</pre></section></div>}</div>;
}
