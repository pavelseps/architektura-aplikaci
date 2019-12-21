import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IStorages from "@/lib/interfaces/IStorages";
import "reflect-metadata";
import IFlightDayController from "@/lib/interfaces/Controllers/IFlightDayController";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IUCFlightDay from "@/lib/interfaces/UseCases/IUCFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";

@injectable()
export default class FlightDayController implements IFlightDayController{
    private readonly _storageDay : IStorage<IFlightDay>;
    private readonly _storageFlight : IStorage<IFlight>;
    private readonly _ucflightDay : IUCFlightDay;

    constructor(
        @inject(TYPES.FlightDayStorage) storageDay : IStorage<IFlightDay>,
        @inject(TYPES.FlightStorage) storageFlight : IStorage<IFlight>,
        @inject(TYPES.UCFlightDay) ucflightDay : IUCFlightDay
    ) {

        this._storageDay = storageDay;
        this._storageFlight = storageFlight;
        this._ucflightDay = ucflightDay;

    }

    private get storages() : IStorages{
        return {
            flightDayStorage: this._storageDay,
            flightStorage: this._storageFlight
        }
    }

    addFlightDay(date: Date){
        return this._ucflightDay.create(date,  this.storages);
    }

    getAllFlightDays(): IFlightDay[] {
        return this._ucflightDay.getAll(this.storages);
    }

    getFlightDay(id: number): IFlightDay | null {
        return this._ucflightDay.get(id, this.storages);
    }

    getFlightsOfDay(id: number): IFlight[] {
        return this._ucflightDay.getFlights(id, this.storages);
    }

    removeFlight(id: number): void {
        this._ucflightDay.remove(id, this.storages);
    }

    setPersonsToDay(id: number, persons: IPerson[]): IFlightDay | null {
        return this._ucflightDay.setPersons(id, persons, this.storages);
    }

    setPlanesToDay(id: number, planes: IPlane[]): IFlightDay | null {
        return this._ucflightDay.setPlanes(id, planes, this.storages);
    }
}