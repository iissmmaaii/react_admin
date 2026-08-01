import { useEffect, useMemo, useState } from 'react';
import { GetSupportConversations, GetSupportMessages } from '../../application/use-cases/support/SupportUseCases';
import { formatDate, shortId } from '../../core/utils/format';
import type { SupportConversation, SupportMessage } from '../../domain/entities/Support';
import { ApiSupportRepository } from '../../infrastructure/repositories/ApiSupportRepository';
import { ChatIcon, RefreshIcon, ShieldIcon } from '../components/common/Icons';
import { Loading } from '../components/common/Loading';

const repository = new ApiSupportRepository();
const getConversations = new GetSupportConversations(repository);
const getMessages = new GetSupportMessages(repository);

export function SupportPage() {
  const [conversations, setConversations] = useState<SupportConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState('');

  const selected = useMemo(() => conversations.find((c) => c.conversationId === selectedId) || null, [conversations, selectedId]);
  const load = async () => { setLoading(true); setError(''); try { const data = await getConversations.execute(); setConversations(data); if (!selectedId && data[0]) setSelectedId(data[0].conversationId); } catch (e) { setError(e instanceof Error ? e.message : 'تعذر تحميل المحادثات'); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);
  useEffect(() => { if (!selectedId) return; setMessagesLoading(true); getMessages.execute(selectedId).then(setMessages).catch((e) => setError(e instanceof Error ? e.message : 'تعذر تحميل الرسائل')).finally(() => setMessagesLoading(false)); }, [selectedId]);

  return <div className="page support-page">
    <header className="page-header"><div><span className="eyebrow">مركز الدعم</span><h1>محادثات العملاء</h1><p>عرض جلسات الدعم المحالة إلى الإدارة ورسائلها المسجلة.</p></div><button className="secondary-button" onClick={load}><RefreshIcon />تحديث</button></header>
    {error && <div className="alert error">{error}</div>}
    <div className="support-layout">
      <section className="conversation-list panel"><div className="panel-header"><h2>المحادثات</h2><span className="result-count">{conversations.length}</span></div>{loading ? <Loading /> : conversations.map((conversation) => <button key={conversation.conversationId} className={`conversation-item ${selectedId === conversation.conversationId ? 'selected' : ''}`} onClick={() => setSelectedId(conversation.conversationId)}><div className="conversation-avatar"><ChatIcon /></div><div><strong>العميل {shortId(conversation.customerUserId || conversation.targetUserId)}</strong><span>{conversation.supportState || conversation.status}</span><small>{formatDate(conversation.lastMessageAt || conversation.createdAt)}</small></div></button>)}</section>
      <section className="messages-panel panel">{!selected ? <div className="chat-placeholder"><ChatIcon /><h3>اختر محادثة</h3></div> : <><div className="messages-header"><div><h2>محادثة الدعم</h2><p>{selected.customerUserId || selected.targetUserId}</p></div><span className="status-badge warning">{selected.supportState || selected.status}</span></div><div className="encryption-note"><ShieldIcon /><div><strong>المراسلة الإدارية المشفرة</strong><span>هذا الويب لا يملك مفتاح Ed25519/تشفير محلي، لذلك يعرض السجل فقط ولا يرسل رسائل غير مشفرة بعد التحويل للإدارة.</span></div></div><div className="messages-list">{messagesLoading ? <Loading /> : messages.map((message) => <article key={message.messageId} className="message-bubble"><div><strong>{shortId(message.senderUserId)}</strong><span>{formatDate(message.createdAt)}</span></div><p>{message.messageMode === 'CLEAR_TEXT' ? message.clearText || '—' : `رسالة مشفرة • SHA-256: ${shortId(message.ciphertextSha256, 20)}`}</p></article>)}</div></>}</section>
    </div>
  </div>;
}
