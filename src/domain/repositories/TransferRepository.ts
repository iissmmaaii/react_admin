import type { TransferReview } from '../entities/TransferReview';

export interface TransferRepository {
  list(status?: string, limit?: number): Promise<TransferReview[]>;
  approve(transactionId: string, adminNote?: string): Promise<unknown>;
  reject(transactionId: string, adminNote: string): Promise<TransferReview>;
}
