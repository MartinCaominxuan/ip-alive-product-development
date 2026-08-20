export interface Repository<TEntity extends { id: string }> {
  getById(id: string): Promise<TEntity | undefined>;
  list(): Promise<TEntity[]>;
  save(entity: TEntity): Promise<void>;
  remove(id: string): Promise<void>;
}

export interface KeyValueStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  remove(key: string): Promise<void>;
}
