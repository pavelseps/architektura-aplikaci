import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import {injectable} from "inversify";
import "reflect-metadata";
import Plane from "@/lib/enterprise_business_rules/entities/Plane";

@injectable()
export default class PlaneStorage implements IStorage<IPlane> {

    get(id: number): IPlane | null {
        let plane = new Plane();
        plane.id = id;
        plane.callsign = "OK-1231";
        return plane;
    }

    getAll(): IPlane[] {
        let result = [
            new Plane(),
            new Plane(),
            new Plane(),
        ];

        result[0].id = 0;
        result[0].callsign = "OK-1231";
        result[1].id = 1;
        result[1].callsign = "OK-4567";
        result[2].id = 2;
        result[2].callsign = "OK-6548";

        return result;
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