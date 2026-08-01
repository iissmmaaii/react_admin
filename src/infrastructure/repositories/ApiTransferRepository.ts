import type { TransferReview } from '../../domain/entities/TransferReview';
import type { TransferRepository } from '../../domain/repositories/TransferRepository';
import { adminApi } from '../api/adminApi';

export class ApiTransferRepository implements TransferRepository {
  list(status?: string, limit?: number): Promise<TransferReview[]> {
    return adminApi.listTransferReviews(status, limit);
  }
  approve(transactionId: string, adminNote?: string): Promise<unknown> {
    return adminApi.approveTransfer(transactionId, adminNote);
  }
  reject(transactionId: string, adminNote: string): Promise<TransferReview> {
    return adminApi.rejectTransfer(transactionId, adminNote);
  }
}
