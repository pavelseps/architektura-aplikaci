export default interface IStorage<I, T>{


    getAll(): I[]

    get(id: number): I | null

    create(data: I): I

    update(id: number, data: I): I

    remove(id: number): void

    intoty(data : I) : T

    tytoin(data : T) : I
}