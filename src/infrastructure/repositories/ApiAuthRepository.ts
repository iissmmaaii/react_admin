import type { AdminSession } from '../../domain/entities/AdminSession';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import { adminApi } from '../api/adminApi';

export class ApiAuthRepository implements AuthRepository {
  login(email: string, password: string): Promise<AdminSession> {
    return adminApi.login(email, password);
  }
}
