export interface AdminSession {
  accessToken: string;
  expiresAt: string;
  userId: string;
  email: string;
  fullName: string;
  nationalId?: string | null;
  role: 'ADMIN';
  permissions: string[];
}
