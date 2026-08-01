import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { LoginAdmin } from '../../application/use-cases/auth/LoginAdmin';
import { tokenStorage } from '../../core/auth/tokenStorage';
import type { AdminSession } from '../../domain/entities/AdminSession';
import { ApiAuthRepository } from '../../infrastructure/repositories/ApiAuthRepository';

interface AuthContextValue {
  session: AdminSession | null;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const loginAdmin = new LoginAdmin(new ApiAuthRepository());

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => tokenStorage.get());

  const login = useCallback(async (email: string, password: string) => {
    const nextSession = await loginAdmin.execute(email, password);
    if (nextSession.role !== 'ADMIN') throw new Error('الحساب لا يملك صلاحية الإدارة');
    tokenStorage.set(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, isAuthenticated: Boolean(session), login, logout }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
