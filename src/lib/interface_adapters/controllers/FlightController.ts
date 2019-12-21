import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IStorages from "@/lib/interfaces/IStorages";
import "reflect-metadata";
import IFlightController from "@/lib/interfaces/Controllers/IFlightController";
import IFlight from "@/lib/interfaces/IFlight";
import IUCFlight from "@/lib/interfaces/UseCases/IUCFlight";

@injectable()
export default class FlightController implements IFlightController{

    private readonly _storage : IStorage<IFlight>;
    private readonly _ucflight : IUCFlight;

    constructor(
        @inject(TYPES.FlightStorage) storage : IStorage<IFlight>,
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

    addFlight(date : Date){
        return this._ucflight.create(date, this.storages);
    }
}