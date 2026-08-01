import { adminApi } from '../../../infrastructure/api/adminApi';

export interface DashboardSummary {
  pendingTransfers: number;
  pendingKycFiles: number;
  supportConversations: number;
  notificationService: 'online' | 'offline';
}

export class GetDashboardSummary {
  async execute(): Promise<DashboardSummary> {
    const [transfers, files, conversations, notifications] = await Promise.allSettled([
      adminApi.listTransferReviews(),
      adminApi.listPendingKyc(),
      adminApi.listConversations(),
      adminApi.getNotificationStatus(),
    ]);

    return {
      pendingTransfers: transfers.status === 'fulfilled' ? transfers.value.length : 0,
      pendingKycFiles: files.status === 'fulfilled' ? files.value.length : 0,
      supportConversations: conversations.status === 'fulfilled' ? conversations.value.length : 0,
      notificationService: notifications.status === 'fulfilled' ? 'online' : 'offline',
    };
  }
}
