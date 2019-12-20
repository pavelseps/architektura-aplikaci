import IStorage from "@/lib/Interfaces/IStorage";

export interface IRepository<T> {
    storage: IStorage<T> | null

    getAll(): T[]

    get(id: number): T | null;

    create(data: T): T

    update(id: number, data: T): T

    remove(id: number): void
}