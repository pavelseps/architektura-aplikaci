import {IRepository} from "@/lib/Interfaces/IRepository";
import IPlane from "@/lib/Interfaces/IPlane";
import IStorage from "@/lib/Interfaces/IStorage";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export default class PlaneRepository implements IRepository<IPlane> {
    storage: IStorage<IPlane> | null;


    constructor() {
        this.storage = null;
    }

    create(data: IPlane): IPlane {
        if (this.storage === null) {
            throw "Storage is not implemented";
        }

        return this.storage.create(data);
    }

    get(id: number): IPlane | null {
        return null;
    }

    getAll(): IPlane[] {
        return [];
    }

    remove(id: number): void {
    }

    update(id: number, data: IPlane): IPlane {
        return data;
    }

}