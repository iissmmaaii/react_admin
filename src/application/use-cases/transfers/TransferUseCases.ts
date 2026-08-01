import type { TransferReview } from '../../../domain/entities/TransferReview';
import type { TransferRepository } from '../../../domain/repositories/TransferRepository';

export class GetTransferReviews {
  constructor(private readonly repository: TransferRepository) {}
  execute(status = 'PENDING_ADMIN_APPROVAL'): Promise<TransferReview[]> {
    return this.repository.list(status, 100);
  }
}

export class ApproveTransfer {
  constructor(private readonly repository: TransferRepository) {}
  execute(id: string, note?: string): Promise<unknown> {
    return this.repository.approve(id, note);
  }
}

export class RejectTransfer {
  constructor(private readonly repository: TransferRepository) {}
  execute(id: string, note: string): Promise<TransferReview> {
    if (!note.trim()) throw new Error('سبب الرفض مطلوب');
    return this.repository.reject(id, note);
  }
}
