import type { KycFile } from '../../domain/entities/KycFile';
import type { KycRepository } from '../../domain/repositories/KycRepository';
import { adminApi } from '../api/adminApi';

export class ApiKycRepository implements KycRepository {
  listPending(): Promise<KycFile[]> {
    return adminApi.listPendingKyc();
  }
  updateStatus(
    fileId: string,
    status: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ): Promise<KycFile> {
    return adminApi.updateKycStatus(fileId, status, rejectionReason);
  }
  download(fileId: string): Promise<Blob> {
    return adminApi.downloadKyc(fileId);
  }
}
