export interface CharacterMail {
  id: string;
  accountId: string;
  characterId: string;
  subject: string;
  body: string;
  sentAt: string;
  readAt?: string;
  attachmentIds?: string[];
}
