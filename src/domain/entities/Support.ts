export interface SupportConversation {
  conversationId: string;
  type: string;
  status: string;
  createdByUserId: string;
  targetUserId?: string | null;
  participantUserIds: string[];
  lastMessageAt?: string | null;
  createdAt?: string | null;
  supportState?: string | null;
  customerUserId?: string | null;
  assignedAdminUserId?: string | null;
  botUserId?: string | null;
}

export interface SupportMessage {
  messageId: string;
  conversationId: string;
  senderUserId: string;
  senderKeyId?: string | null;
  clientMessageId: string;
  messageMode: 'ENCRYPTED' | 'CLEAR_TEXT';
  ciphertext?: string | null;
  ciphertextSha256?: string | null;
  nonceBase64?: string | null;
  senderSignatureBase64?: string | null;
  clearText?: string | null;
  handoffReplayOfMessageId?: string | null;
  status: string;
  createdAt?: string | null;
}

export interface AdminProfile {
  adminEmail?: string;
  adminUser?: {
    userId: string;
    email: string;
    fullName: string;
    nationalId?: string | null;
  };
  accounts?: unknown[];
  [key: string]: unknown;
}
