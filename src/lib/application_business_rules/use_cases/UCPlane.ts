import IStorages from "@/lib/Interfaces/IStorages";
import IUCPlane from "@/lib/Interfaces/IUCPlane";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import IPlane from "@/lib/Interfaces/IPlane";
import {TYPES} from "@/lib/injection/types";
import {IRepository} from "@/lib/Interfaces/IRepository";

@injectable()
export default class UCPlane implements IUCPlane {

    private readonly _planeFactory: () => IPlane;
    private readonly _planeRepository: IRepository<IPlane>;

    constructor(
        @inject(TYPES.PlaneFactory) planeFactory: () => IPlane,
        @inject(TYPES.PlaneRepository) planeRepository: IRepository<IPlane>
    ) {

        this._planeFactory = planeFactory;
        this._planeRepository = planeRepository;
    }

    addPlane(callsign: string, {planeStorage}: IStorages) {
        let plane = this._planeFactory();
        plane.callsign = callsign;

        if (planeStorage !== undefined) {
            this._planeRepository.storage = planeStorage;
            this._planeRepository.create(plane);
        }

        return plane;
    }
}