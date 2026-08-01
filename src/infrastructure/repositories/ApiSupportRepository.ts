import type { AdminProfile, SupportConversation, SupportMessage } from '../../domain/entities/Support';
import type { SupportRepository } from '../../domain/repositories/SupportRepository';
import { adminApi } from '../api/adminApi';

export class ApiSupportRepository implements SupportRepository {
  listConversations(): Promise<SupportConversation[]> {
    return adminApi.listConversations();
  }
  listMessages(conversationId: string, limit?: number): Promise<SupportMessage[]> {
    return adminApi.listMessages(conversationId, limit);
  }
  getAdminProfile(): Promise<AdminProfile> {
    return adminApi.getAdminProfile();
  }
}
