import IStorage from "@/lib/interfaces/IStorage";
import {injectable} from "inversify";
import "reflect-metadata";
import IPerson from "@/lib/interfaces/IPerson";
import LocalStorageStorage from "@/lib/LocalStorageStorage";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";

@injectable()
export default class PersonStorage implements IStorage<IPerson, TPersonStorage> {

    static STORAGE_NAME = "PersonStorage";

    private readonly _storage: LocalStorageStorage<TPersonStorage>;

    constructor() {
        this._storage = new LocalStorageStorage<TPersonStorage>(PersonStorage.STORAGE_NAME);
    }

    get(id: number): IPerson | null {
        return this._storage.get(id);
    }

    getAll(): IPerson[] {
        return this._storage.getAll();
    }

    remove(id: number): void {
        this._storage.remove(id)
    }

    update(id: number, data: IPerson): IPerson {
        return this._storage.update(id, data);
    }

    create(data: IPerson): IPerson {
        return this._storage.create(data);
    }

    intoty(data: TPersonStorage): IPerson {
        return <IPerson>data;
    }

    tytoin(data: IPerson): TPersonStorage {
        return <TPersonStorage>data;
    }
}