import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';
import { ChatIcon, DashboardIcon, FileIcon, LogoutIcon, MenuIcon, ShieldIcon, TransferIcon, UserIcon } from '../common/Icons';

const items = [
  { to: '/dashboard', label: 'نظرة عامة', icon: DashboardIcon },
  { to: '/transfers', label: 'مراجعة التحويلات', icon: TransferIcon },
  { to: '/kyc', label: 'مراجعة KYC', icon: FileIcon },
  { to: '/support', label: 'محادثات الدعم', icon: ChatIcon },
  { to: '/profile', label: 'ملف الإدارة', icon: UserIcon },
];

export function AppShell() {
  const [open, setOpen] = useState(false);
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return <div className="app-shell">
    <button className="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label="القائمة"><MenuIcon /></button>
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ShieldIcon /></div><div><strong>CypherVault</strong><span>لوحة الإدارة</span></div></div>
      <nav>
        {items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Icon />{label}</NavLink>)}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-mini"><div className="avatar">{session?.fullName?.charAt(0) || 'A'}</div><div><strong>{session?.fullName}</strong><span>{session?.email}</span></div></div>
        <button className="logout-button" onClick={signOut}><LogoutIcon />تسجيل الخروج</button>
      </div>
    </aside>
    {open && <button className="sidebar-overlay" onClick={() => setOpen(false)} aria-label="إغلاق القائمة" />}
    <main className="main-content"><Outlet /></main>
  </div>;
}
