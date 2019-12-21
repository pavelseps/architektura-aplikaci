import IStorages from "@/lib/interfaces/IStorages";
import IUCPlane from "@/lib/interfaces/UseCases/IUCPlane";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import IPlane from "@/lib/interfaces/IPlane";
import {TYPES} from "@/lib/injection/types";

@injectable()
export default class UCPlane implements IUCPlane {

    private readonly _planeFactory: () => IPlane;

    constructor(
        @inject(TYPES.PlaneFactory) planeFactory: () => IPlane,
    ) {

        this._planeFactory = planeFactory;
    }

    add(callsign: string, {planeStorage}: IStorages) {

        if (planeStorage !== undefined) {
            let plane = this._planeFactory();
            plane.callsign = callsign;

            return planeStorage.create(plane);
        }

        return null;
    }

    getAll({planeStorage}: IStorages): IPlane[] {

        if (planeStorage !== undefined) {
            return planeStorage.getAll();
        }

        return [];
    }

    get(id: number, {planeStorage}: IStorages): IPlane | null {

        if (planeStorage !== undefined) {
            return planeStorage.get(id);
        }

        return null;
    }

    update(id: number, callsign: string, {planeStorage}: IStorages): IPlane | null {

        if (planeStorage !== undefined) {
            let plane = this._planeFactory();
            plane.callsign = callsign;

            return planeStorage.update(id, plane);
        }

        return null;
    }

    remove(id: number, {planeStorage}: IStorages): void {
        if (planeStorage !== undefined) {
            planeStorage.remove(id);
        }
    }
}