import type { AdminSession } from '../../domain/entities/AdminSession';

const SESSION_KEY = 'cyphervault.admin.session';

export const tokenStorage = {
  get(): AdminSession | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const session = JSON.parse(raw) as AdminSession;
      if (!session.accessToken || !session.expiresAt || session.role !== 'ADMIN') {
        this.clear();
        return null;
      }
      if (new Date(session.expiresAt).getTime() <= Date.now()) {
        this.clear();
        return null;
      }
      return session;
    } catch {
      this.clear();
      return null;
    }
  },

  set(session: AdminSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  clear(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },
};
