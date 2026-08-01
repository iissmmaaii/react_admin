export interface KycFile {
  fileId: string;
  userId: string;
  fileUrl?: string | null;
  originalFilename: string;
  contentType: string;
  fileSizeBytes: number;
  status: string;
  rejectionReason?: string | null;
  uploadedAt: string;
  reviewedAt?: string | null;
  expectedFullName?: string | null;
  expectedNationalId?: string | null;
  aiDecision?: string | null;
  aiConfidence?: number | null;
  aiModelName?: string | null;
  aiReviewedAt?: string | null;
  extractedFullName?: string | null;
  extractedNationalId?: string | null;
  identityExtractionConfidence?: number | null;
  identityExtractionReason?: string | null;
  nameMatch?: boolean | null;
  nameMatchScore?: number | null;
  nationalIdMatch?: boolean | null;
}
