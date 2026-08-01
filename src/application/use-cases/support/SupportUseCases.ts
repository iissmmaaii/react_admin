import type { AdminProfile, SupportConversation, SupportMessage } from '../../../domain/entities/Support';
import type { SupportRepository } from '../../../domain/repositories/SupportRepository';

export class GetSupportConversations {
  constructor(private readonly repository: SupportRepository) {}
  execute(): Promise<SupportConversation[]> {
    return this.repository.listConversations();
  }
}

export class GetSupportMessages {
  constructor(private readonly repository: SupportRepository) {}
  execute(conversationId: string): Promise<SupportMessage[]> {
    return this.repository.listMessages(conversationId, 100);
  }
}

export class GetAdminProfile {
  constructor(private readonly repository: SupportRepository) {}
  execute(): Promise<AdminProfile> {
    return this.repository.getAdminProfile();
  }
}
