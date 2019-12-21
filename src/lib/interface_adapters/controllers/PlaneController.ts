import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import IUCPlane from "@/lib/interfaces/UseCases/IUCPlane";
import IStorages from "@/lib/interfaces/IStorages";
import IPlaneController from "@/lib/interfaces/Controllers/IPlaneController";
import "reflect-metadata";

@injectable()
export default class PlaneController implements IPlaneController{

    private readonly _storage : IStorage<IPlane>;
    private readonly _ucplane : IUCPlane;

    constructor(
        @inject(TYPES.PlaneStorage) storage : IStorage<IPlane>,
        @inject(TYPES.UCPlane) ucplane : IUCPlane
    ) {

        this._storage = storage;
        this._ucplane = ucplane;

    }

    private get storages() : IStorages{
        return {
            planeStorage: this._storage
        }
    }

    addPlane(callsign : string){
        return this._ucplane.add(callsign, this.storages)
    }
}