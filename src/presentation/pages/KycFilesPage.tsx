import { useEffect, useState } from 'react';
import { DownloadKycFile, GetPendingKycFiles, ReviewKycFile } from '../../application/use-cases/kyc/KycUseCases';
import { formatBytes, formatDate } from '../../core/utils/format';
import type { KycFile } from '../../domain/entities/KycFile';
import { ApiKycRepository } from '../../infrastructure/repositories/ApiKycRepository';
import { CheckIcon, CloseIcon, DownloadIcon, EyeIcon, RefreshIcon } from '../components/common/Icons';
import { EmptyState } from '../components/common/EmptyState';
import { Loading } from '../components/common/Loading';
import { Modal } from '../components/common/Modal';
import { KycDetails } from '../components/kyc/KycDetails';

const repository = new ApiKycRepository();
const getPending = new GetPendingKycFiles(repository);
const reviewFile = new ReviewKycFile(repository);
const downloadFile = new DownloadKycFile(repository);

export function KycFilesPage() {
  const [files, setFiles] = useState<KycFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<KycFile | null>(null);
  const [decision, setDecision] = useState<'APPROVED' | 'REJECTED' | null>(null);
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => { setLoading(true); setError(''); try { setFiles(await getPending.execute()); } catch (e) { setError(e instanceof Error ? e.message : 'تعذر تحميل الملفات'); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);

  const preview = async (file: KycFile) => {
    try { const blob = await downloadFile.execute(file.fileId); const url = URL.createObjectURL(blob); window.open(url, '_blank', 'noopener,noreferrer'); setTimeout(() => URL.revokeObjectURL(url), 60_000); }
    catch (e) { setError(e instanceof Error ? e.message : 'تعذر فتح الملف'); }
  };

  const save = async () => {
    if (!selected || !decision) return;
    setSaving(true); setError('');
    try { await reviewFile.execute(selected.fileId, decision, reason); setSelected(null); setDecision(null); setReason(''); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : 'فشل حفظ القرار'); } finally { setSaving(false); }
  };

  return <div className="page">
    <header className="page-header"><div><span className="eyebrow">التحقق من الهوية</span><h1>مراجعة ملفات KYC</h1><p>قارن بيانات المستخدم مع نتائج تحليل الهوية بالذكاء الاصطناعي.</p></div><button className="secondary-button" onClick={load}><RefreshIcon />تحديث</button></header>
    {error && <div className="alert error">{error}</div>}
    {loading ? <Loading /> : files.length === 0 ? <section className="panel"><EmptyState title="لا توجد ملفات معلقة" description="جميع ملفات الهوية تمت مراجعتها." /></section> : <div className="kyc-grid">{files.map((file) => <article className="kyc-card" key={file.fileId}><div className="file-preview"><span>{file.contentType?.includes('pdf') ? 'PDF' : 'ID'}</span></div><div className="kyc-card-body"><div className="card-title"><div><h3>{file.originalFilename}</h3><p>{formatBytes(file.fileSizeBytes)} • {formatDate(file.uploadedAt)}</p></div><span className={`status-badge ${file.aiDecision === 'APPROVED' ? 'success' : 'warning'}`}>{file.aiDecision || 'بانتظار AI'}</span></div><div className="match-grid"><div><span>الاسم</span><strong>{file.nameMatch === true ? 'متطابق' : file.nameMatch === false ? 'غير متطابق' : 'غير محدد'}</strong></div><div><span>الرقم الوطني</span><strong>{file.nationalIdMatch === true ? 'متطابق' : file.nationalIdMatch === false ? 'غير متطابق' : 'غير محدد'}</strong></div><div><span>ثقة AI</span><strong>{file.aiConfidence != null ? `${Math.round(file.aiConfidence * 100)}%` : '—'}</strong></div></div><div className="card-actions"><button className="secondary-button" onClick={() => preview(file)}><DownloadIcon />فتح الملف</button><button className="icon-button" onClick={() => { setSelected(file); setDecision(null); }}><EyeIcon /></button><button className="icon-button approve" onClick={() => { setSelected(file); setDecision('APPROVED'); }}><CheckIcon /></button><button className="icon-button reject" onClick={() => { setSelected(file); setDecision('REJECTED'); }}><CloseIcon /></button></div></div></article>)}</div>}
    {selected && <Modal title={decision === 'APPROVED' ? 'الموافقة على ملف الهوية' : decision === 'REJECTED' ? 'رفض ملف الهوية' : 'تفاصيل ملف الهوية'} onClose={() => { setSelected(null); setDecision(null); setReason(''); }}><KycDetails file={selected} />{decision && <div className="decision-box">{decision === 'REJECTED' && <label>سبب الرفض<textarea rows={4} maxLength={500} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="مثال: صورة الهوية غير واضحة" /></label>}<div className="modal-actions"><button className="secondary-button" onClick={() => { setSelected(null); setDecision(null); }}>إلغاء</button><button className={decision === 'APPROVED' ? 'primary-button' : 'danger-button'} onClick={save} disabled={saving}>{saving ? 'جارٍ الحفظ...' : decision === 'APPROVED' ? 'تأكيد الموافقة' : 'تأكيد الرفض'}</button></div></div>}</Modal>}
  </div>;
}
