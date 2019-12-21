import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import {injectable} from "inversify";
import "reflect-metadata";
import LocalStorageStorage from "@/lib/LocalStorageStorage";
import {TPlaneStorage} from "@/lib/interfaces/Storages/TPlaneStorage";

@injectable()
export default class PlaneStorage implements IStorage<IPlane, TPlaneStorage> {
    static STORAGE_NAME = "PlaneStorage";

    private readonly _storage: LocalStorageStorage<TPlaneStorage>;

    constructor() {
        this._storage = new LocalStorageStorage<TPlaneStorage>(PlaneStorage.STORAGE_NAME);
    }

    get(id: number): IPlane | null {
        return this._storage.get(id);
    }

    getAll(): IPlane[] {
        return this._storage.getAll();
    }

    remove(id: number): void {
        this._storage.remove(id);
    }

    update(id: number, data: IPlane): IPlane {
        return this._storage.update(id, data);
    }

    create(data: IPlane): IPlane {
        return this._storage.create(data);
    }

    intoty(data: TPlaneStorage): IPlane {
        return <IPlane>data;
    }

    tytoin(data: IPlane): TPlaneStorage {
        return <TPlaneStorage>data;
    }
}