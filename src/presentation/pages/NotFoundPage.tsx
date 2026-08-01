import { Link } from 'react-router-dom';
export function NotFoundPage() { return <div className="not-found"><strong>404</strong><h1>الصفحة غير موجودة</h1><Link className="primary-button" to="/dashboard">العودة للوحة التحكم</Link></div>; }
