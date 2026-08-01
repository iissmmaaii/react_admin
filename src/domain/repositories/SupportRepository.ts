import type { AdminProfile, SupportConversation, SupportMessage } from '../entities/Support';

export interface SupportRepository {
  listConversations(): Promise<SupportConversation[]>;
  listMessages(conversationId: string, limit?: number): Promise<SupportMessage[]>;
  getAdminProfile(): Promise<AdminProfile>;
}
