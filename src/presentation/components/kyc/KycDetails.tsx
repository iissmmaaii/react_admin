import type { KycFile } from '../../../domain/entities/KycFile';
import { formatBytes, formatDate } from '../../../core/utils/format';

export function KycDetails({ file }: { file: KycFile }) {
  const rows: Array<[string, unknown]> = [
    ['اسم الملف', file.originalFilename], ['الحجم', formatBytes(file.fileSizeBytes)], ['نوع المحتوى', file.contentType], ['المستخدم', file.userId],
    ['الاسم المتوقع', file.expectedFullName], ['الاسم المستخرج', file.extractedFullName], ['تطابق الاسم', file.nameMatch], ['درجة تطابق الاسم', file.nameMatchScore],
    ['الرقم الوطني المتوقع', file.expectedNationalId], ['الرقم الوطني المستخرج', file.extractedNationalId], ['تطابق الرقم الوطني', file.nationalIdMatch],
    ['قرار AI', file.aiDecision], ['ثقة AI', file.aiConfidence], ['نموذج AI', file.aiModelName], ['سبب الاستخراج', file.identityExtractionReason], ['تاريخ الرفع', formatDate(file.uploadedAt)],
  ];
  return <div className="detail-list">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{typeof value === 'boolean' ? (value ? 'نعم' : 'لا') : value === null || value === undefined || value === '' ? '—' : String(value)}</strong></div>)}</div>;
}
