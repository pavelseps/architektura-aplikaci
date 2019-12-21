import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/Interfaces/IStorage";
import IStorages from "@/lib/Interfaces/IStorages";
import "reflect-metadata";
import IFlightDayController from "@/lib/Interfaces/Controllers/IFlightDayController";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IUCFlightDay from "@/lib/Interfaces/UseCases/IUCFlightDay";

@injectable()
export default class FlightDayController implements IFlightDayController{

    private readonly _storage : IStorage<IFlightDay>;
    private readonly _ucflightDay : IUCFlightDay;

    constructor(
        @inject(TYPES.FlightDayStorage) storage : IStorage<IFlightDay>,
        @inject(TYPES.UCFlightDay) ucflightDay : IUCFlightDay
    ) {

        this._storage = storage;
        this._ucflightDay = ucflightDay;

    }

    private get storages() : IStorages{
        return {
            flightDayStorage: this._storage
        }
    }

    addFlightDay(date: Date){
        return this._ucflightDay.create(date,  this.storages);
    }
}