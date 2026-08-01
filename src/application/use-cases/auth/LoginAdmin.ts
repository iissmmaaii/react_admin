import type { AdminSession } from '../../../domain/entities/AdminSession';
import type { AuthRepository } from '../../../domain/repositories/AuthRepository';

export class LoginAdmin {
  constructor(private readonly repository: AuthRepository) {}

  execute(email: string, password: string): Promise<AdminSession> {
    return this.repository.login(email.trim().toLowerCase(), password);
  }
}
