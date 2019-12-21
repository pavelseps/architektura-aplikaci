import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IStorages from "@/lib/interfaces/IStorages";
import "reflect-metadata";
import IFlightController from "@/lib/interfaces/Controllers/IFlightController";
import IFlight from "@/lib/interfaces/IFlight";
import IUCFlight from "@/lib/interfaces/UseCases/IUCFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";

@injectable()
export default class FlightController implements IFlightController{
    private readonly _storage : IStorage<IFlight, TFlightStorage>;
    private readonly _ucflight : IUCFlight;

    constructor(
        @inject(TYPES.FlightStorage) storage : IStorage<IFlight, TFlightStorage>,
        @inject(TYPES.UCFlight) ucflight : IUCFlight
    ) {

        this._storage = storage;
        this._ucflight = ucflight;

    }

    private get storages() : IStorages{
        return {
            flightStorage: this._storage
        }
    }

    addFlight(date : Date, captain: IPerson, crew: IPerson[], plane: IPlane,){
        return this._ucflight.create(date, captain, crew, plane, this.storages);
    }

    finishFlight(id: number, date: Date): IFlight | null {
        return this._ucflight.finish(id, date, this.storages);
    }

    getFlight(id: number): IFlight | null {
        return this._ucflight.get(id, this.storages);
    }

    removeFlight(id: number): void {
        this._ucflight.remove(id, this.storages);
    }

    setFlightReady(id: number): IFlight | null {
        return this._ucflight.prepare(id, true, this.storages);
    }

    setFlightWaiting(id: number): IFlight | null {
        return this._ucflight.prepare(id, false, this.storages);
    }

    setPlaneForFlight(id: number, captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null {
        return this._ucflight.setPlane(id, captain, crew, plane, this.storages);
    }

    setTowPlaneForFlight(id: number, captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null {
        return this._ucflight.setTow(id, captain, crew, plane, this.storages);
    }

    startFlight(id: number, date: Date): IFlight | null {
        return this._ucflight.finish(id, date, this.storages);
    }
}