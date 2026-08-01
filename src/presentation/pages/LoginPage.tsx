import { type FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { ShieldIcon } from '../components/common/Icons';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('asmaylbae522@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from || '/dashboard', { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر تسجيل الدخول');
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="login-page">
    <section className="login-visual">
      <div className="login-badge"><ShieldIcon /> وصول إداري محمي</div>
      <h1>إدارة العمليات المصرفية بثقة ووضوح.</h1>
      <p>راجع التحويلات عالية الخطورة، قرارات KYC، ومحادثات الدعم من مكان واحد.</p>
      <div className="security-points"><span>JWT موحّد</span><span>صلاحية ADMIN</span><span>سجل تدقيق</span></div>
    </section>
    <section className="login-panel">
      <form className="login-card" onSubmit={submit}>
        <div className="login-logo"><ShieldIcon /><div><strong>CypherVault</strong><span>Admin Console</span></div></div>
        <div><h2>تسجيل دخول الإدارة</h2><p>أدخل بريد الإدارة وكلمة المرور للمتابعة.</p></div>
        {error && <div className="alert error">{error}</div>}
        <label>البريد الإلكتروني<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
        <label>كلمة المرور<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
        <button className="primary-button large" type="submit" disabled={submitting}>{submitting ? 'جارٍ التحقق...' : 'دخول آمن'}</button>
        <small>يتم إرسال البيانات إلى IAM عبر API Gateway على المنفذ 8080.</small>
      </form>
    </section>
  </div>;
}
