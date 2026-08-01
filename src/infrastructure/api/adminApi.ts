import type { ApiResponse } from '../../core/api/ApiResponse';
import { httpClient } from '../../core/api/httpClient';
import type { AdminSession } from '../../domain/entities/AdminSession';
import type { KycFile } from '../../domain/entities/KycFile';
import type { AdminProfile, SupportConversation, SupportMessage } from '../../domain/entities/Support';
import type { TransferReview } from '../../domain/entities/TransferReview';

export const adminApi = {
  async login(email: string, password: string): Promise<AdminSession> {
    const response = await httpClient.post<ApiResponse<AdminSession>>('/api/auth/admin/login', { email, password });
    return response.data.data;
  },

  async listTransferReviews(status = 'PENDING_ADMIN_APPROVAL', limit = 100): Promise<TransferReview[]> {
    const response = await httpClient.get<ApiResponse<TransferReview[]>>('/api/admin/accounts/transfer-reviews', {
      params: { status, limit },
    });
    return response.data.data;
  },

  async approveTransfer(transactionId: string, adminNote?: string): Promise<unknown> {
    const response = await httpClient.post<ApiResponse<unknown>>(
      `/api/admin/accounts/transfer-reviews/${transactionId}/approve`,
      adminNote?.trim() ? { adminNote: adminNote.trim() } : {},
    );
    return response.data.data;
  },

  async rejectTransfer(transactionId: string, adminNote: string): Promise<TransferReview> {
    const response = await httpClient.post<ApiResponse<TransferReview>>(
      `/api/admin/accounts/transfer-reviews/${transactionId}/reject`,
      { adminNote: adminNote.trim() },
    );
    return response.data.data;
  },

  async listPendingKyc(): Promise<KycFile[]> {
    const response = await httpClient.get<ApiResponse<KycFile[]>>('/api/admin/files/pending');
    return response.data.data;
  },

  async updateKycStatus(
    fileId: string,
    status: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ): Promise<KycFile> {
    const response = await httpClient.patch<ApiResponse<KycFile>>(`/api/admin/files/${fileId}/status`, {
      status,
      rejectionReason: status === 'REJECTED' ? rejectionReason?.trim() : undefined,
    });
    return response.data.data;
  },

  async downloadKyc(fileId: string): Promise<Blob> {
    const response = await httpClient.get(`/api/admin/files/${fileId}/download`, { responseType: 'blob' });
    return response.data as Blob;
  },

  async listConversations(): Promise<SupportConversation[]> {
    const response = await httpClient.get<ApiResponse<SupportConversation[]>>('/api/chat/v1/conversations');
    return response.data.data;
  },

  async listMessages(conversationId: string, limit = 100): Promise<SupportMessage[]> {
    const response = await httpClient.get<ApiResponse<SupportMessage[]>>(
      `/api/chat/v1/conversations/${conversationId}/messages`,
      { params: { limit } },
    );
    return response.data.data;
  },

  async getAdminProfile(): Promise<AdminProfile> {
    const response = await httpClient.get<ApiResponse<AdminProfile>>('/api/chat/v1/support/admin/profile');
    return response.data.data;
  },

  async getNotificationStatus(): Promise<unknown> {
    const response = await httpClient.get('/api/notifications/ready');
    return response.data;
  },
};
