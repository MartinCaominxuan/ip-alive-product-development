import type { Repository } from "./types";

export class MemoryRepository<TEntity extends { id: string }> implements Repository<TEntity> {
  private readonly entities = new Map<string, TEntity>();

  constructor(initialEntities: TEntity[] = []) {
    initialEntities.forEach((entity) => this.entities.set(entity.id, entity));
  }

  async getById(id: string): Promise<TEntity | undefined> {
    return this.entities.get(id);
  }

  async list(): Promise<TEntity[]> {
    return [...this.entities.values()];
  }

  async save(entity: TEntity): Promise<void> {
    this.entities.set(entity.id, entity);
  }

  async remove(id: string): Promise<void> {
    this.entities.delete(id);
  }
}
