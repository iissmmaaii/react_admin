import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../../presentation/components/layout/AppShell';
import { DashboardPage } from '../../presentation/pages/DashboardPage';
import { KycFilesPage } from '../../presentation/pages/KycFilesPage';
import { LoginPage } from '../../presentation/pages/LoginPage';
import { NotFoundPage } from '../../presentation/pages/NotFoundPage';
import { ProfilePage } from '../../presentation/pages/ProfilePage';
import { SupportPage } from '../../presentation/pages/SupportPage';
import { TransferReviewsPage } from '../../presentation/pages/TransferReviewsPage';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transfers" element={<TransferReviewsPage />} />
        <Route path="/kyc" element={<KycFilesPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}
