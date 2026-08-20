export interface ContentRecord<TPayload> {
  id: string;
  type: "character" | "outfit" | "destination" | "event" | "match3-level" | "reward";
  version: number;
  status: "draft" | "published" | "archived";
  payload: TPayload;
  updatedAt: string;
}

export interface ContentRepository {
  get<TPayload>(id: string): Promise<ContentRecord<TPayload> | undefined>;
  listPublished<TPayload>(type: ContentRecord<TPayload>["type"]): Promise<ContentRecord<TPayload>[]>;
}
