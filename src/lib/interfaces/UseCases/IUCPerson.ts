import IStorages from "@/lib/interfaces/IStorages";
import IPerson from "@/lib/interfaces/IPerson";

export default interface IUCPerson {
    add(name: string, surname: string, email: string, storage: IStorages): IPerson | null

    getAll(storage: IStorages): IPerson[]

    get(id: number, storage: IStorages): IPerson | null

    update(id: number, name: string, surname: string, email: string, storage: IStorages): IPerson | null

    remove(id: number, storage: IStorages): void
}