import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export default class PlaneStorage implements IStorage<IPlane> {

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

    create(data: IPlane): IPlane {
        console.log("Saving to local storage plane", data);
        return data;
    }
}