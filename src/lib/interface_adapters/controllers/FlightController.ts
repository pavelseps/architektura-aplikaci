import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/Interfaces/IStorage";
import IStorages from "@/lib/Interfaces/IStorages";
import "reflect-metadata";
import IFlightController from "@/lib/Interfaces/Controllers/IFlightController";
import IFlight from "@/lib/Interfaces/IFlight";
import IUCFlight from "@/lib/Interfaces/UseCases/IUCFlight";

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