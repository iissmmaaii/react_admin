import type { KycFile } from '../entities/KycFile';

export interface KycRepository {
  listPending(): Promise<KycFile[]>;
  updateStatus(fileId: string, status: 'APPROVED' | 'REJECTED', rejectionReason?: string): Promise<KycFile>;
  download(fileId: string): Promise<Blob>;
}
