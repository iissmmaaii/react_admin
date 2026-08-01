import type { TransferReview } from '../../../domain/entities/TransferReview';
import { formatDate, formatMoney } from '../../../core/utils/format';

export function TransferDetails({ item }: { item: TransferReview }) {
  const rows: Array<[string, unknown]> = [
    ['رقم العملية', item.id], ['Client Request ID', item.clientRequestId], ['المرسل', item.senderUserEmail || item.senderUserId],
    ['المستقبل', item.receiverUserId], ['القيمة', formatMoney(item.amountMinor, item.currency)], ['الحالة', item.status],
    ['عنوان IP', item.ipAddress], ['الجهاز', item.deviceId], ['User Agent', item.userAgent], ['قرار AI', item.aiDecision],
    ['مستوى الخطورة', item.aiRiskLevel], ['درجة الخطورة', item.aiRiskScore], ['سبب AI', item.aiReason],
    ['تقرير الإدارة من AI', item.aiAdminReport], ['وقت فحص AI', formatDate(item.aiCheckedAt)], ['تاريخ الإنشاء', formatDate(item.createdAt)],
  ];
  return <div className="detail-list">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value === null || value === undefined || value === '' ? '—' : String(value)}</strong></div>)}</div>;
}
