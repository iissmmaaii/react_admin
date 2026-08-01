import type { AdminSession } from '../entities/AdminSession';

export interface AuthRepository {
  login(email: string, password: string): Promise<AdminSession>;
}
