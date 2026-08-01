import type { KycFile } from '../../../domain/entities/KycFile';
import type { KycRepository } from '../../../domain/repositories/KycRepository';

export class GetPendingKycFiles {
  constructor(private readonly repository: KycRepository) {}
  execute(): Promise<KycFile[]> {
    return this.repository.listPending();
  }
}

export class ReviewKycFile {
  constructor(private readonly repository: KycRepository) {}
  execute(fileId: string, status: 'APPROVED' | 'REJECTED', reason?: string): Promise<KycFile> {
    if (status === 'REJECTED' && !reason?.trim()) throw new Error('سبب الرفض مطلوب');
    return this.repository.updateStatus(fileId, status, reason);
  }
}

export class DownloadKycFile {
  constructor(private readonly repository: KycRepository) {}
  execute(fileId: string): Promise<Blob> {
    return this.repository.download(fileId);
  }
}
