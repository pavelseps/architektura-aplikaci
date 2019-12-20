export default interface IStorage<T>{


    getAll(): T[]

    get(id: number): T | null

    create(data: T): T

    update(id: number, data: T): T

    remove(id: number): void
}