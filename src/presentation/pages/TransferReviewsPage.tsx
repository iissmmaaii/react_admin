import { useEffect, useMemo, useState } from 'react';
import { ApproveTransfer, GetTransferReviews, RejectTransfer } from '../../application/use-cases/transfers/TransferUseCases';
import { formatDate, formatMoney, shortId } from '../../core/utils/format';
import type { TransferReview } from '../../domain/entities/TransferReview';
import { ApiTransferRepository } from '../../infrastructure/repositories/ApiTransferRepository';
import { CheckIcon, CloseIcon, EyeIcon, RefreshIcon } from '../components/common/Icons';
import { Loading } from '../components/common/Loading';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { TransferDetails } from '../components/transfers/TransferDetails';

const repository = new ApiTransferRepository();
const getReviews = new GetTransferReviews(repository);
const approveTransfer = new ApproveTransfer(repository);
const rejectTransfer = new RejectTransfer(repository);

export function TransferReviewsPage() {
  const [items, setItems] = useState<TransferReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<TransferReview | null>(null);
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try { setItems(await getReviews.execute()); } catch (e) { setError(e instanceof Error ? e.message : 'تعذر تحميل التحويلات'); } finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);

  const filtered = useMemo(() => items.filter((item) => [item.senderUserEmail, item.clientRequestId, item.id].some((v) => v?.toLowerCase().includes(search.toLowerCase()))), [items, search]);

  const executeAction = async () => {
    if (!selected || !action) return;
    if (action === 'reject' && !note.trim()) { setError('سبب الرفض مطلوب'); return; }
    setSaving(true); setError('');
    try {
      if (action === 'approve') await approveTransfer.execute(selected.id, note);
      else await rejectTransfer.execute(selected.id, note);
      setSelected(null); setAction(null); setNote(''); await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'فشل تنفيذ القرار'); } finally { setSaving(false); }
  };

  return <div className="page">
    <header className="page-header"><div><span className="eyebrow">إدارة المخاطر</span><h1>مراجعة التحويلات</h1><p>العمليات التي أوقفها تحليل المخاطر وتحتاج قراراً إدارياً.</p></div><button className="secondary-button" onClick={load}><RefreshIcon />تحديث</button></header>
    {error && <div className="alert error">{error}</div>}
    <section className="panel"><div className="toolbar"><input className="search-input" placeholder="بحث بالبريد أو رقم الطلب..." value={search} onChange={(e) => setSearch(e.target.value)} /><span className="result-count">{filtered.length} عملية</span></div>
      {loading ? <Loading /> : filtered.length === 0 ? <EmptyState title="لا توجد تحويلات معلقة" description="لا توجد عمليات بحاجة إلى مراجعة حالياً." /> :
      <div className="table-wrap"><table><thead><tr><th>المرسل</th><th>القيمة</th><th>الخطورة</th><th>قرار AI</th><th>التاريخ</th><th>الإجراءات</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.senderUserEmail || shortId(item.senderUserId)}</strong><small>{shortId(item.clientRequestId, 16)}</small></td><td>{formatMoney(item.amountMinor, item.currency)}</td><td><span className={`status-badge risk-${(item.aiRiskLevel || 'unknown').toLowerCase()}`}>{item.aiRiskLevel || 'غير محدد'} {item.aiRiskScore != null ? `${Math.round(item.aiRiskScore * 100)}%` : ''}</span></td><td>{item.aiDecision || '—'}</td><td>{formatDate(item.createdAt)}</td><td><div className="row-actions"><button className="icon-button" title="التفاصيل" onClick={() => { setSelected(item); setAction(null); }}><EyeIcon /></button><button className="icon-button approve" title="موافقة" onClick={() => { setSelected(item); setAction('approve'); }}><CheckIcon /></button><button className="icon-button reject" title="رفض" onClick={() => { setSelected(item); setAction('reject'); }}><CloseIcon /></button></div></td></tr>)}</tbody></table></div>}
    </section>
    {selected && <Modal title={action === 'approve' ? 'الموافقة على التحويل' : action === 'reject' ? 'رفض التحويل' : 'تفاصيل التحويل'} onClose={() => { setSelected(null); setAction(null); setNote(''); }}>
      <TransferDetails item={selected} />
      {action && <div className="decision-box"><label>{action === 'reject' ? 'سبب الرفض (إجباري)' : 'ملاحظة الإدارة (اختيارية)'}<textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="اكتب ملاحظة واضحة تسجل مع القرار..." /></label><div className="modal-actions"><button className="secondary-button" onClick={() => { setSelected(null); setAction(null); }}>إلغاء</button><button className={action === 'approve' ? 'primary-button' : 'danger-button'} onClick={executeAction} disabled={saving}>{saving ? 'جارٍ الحفظ...' : action === 'approve' ? 'تأكيد الموافقة' : 'تأكيد الرفض'}</button></div></div>}
    </Modal>}
  </div>;
}
