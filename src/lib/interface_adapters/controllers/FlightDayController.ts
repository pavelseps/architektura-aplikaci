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
import {TFlightDayStorage} from "@/lib/interfaces/Storages/TFlightDayStorage";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";

@injectable()
export default class FlightDayController implements IFlightDayController{
    private readonly _storageDay : IStorage<IFlightDay, TFlightDayStorage>;
    private readonly _storageFlight : IStorage<IFlight, TFlightStorage>;
    private readonly _ucflightDay : IUCFlightDay;

    constructor(
        @inject(TYPES.FlightDayStorage) storageDay : IStorage<IFlightDay, TFlightDayStorage>,
        @inject(TYPES.FlightStorage) storageFlight : IStorage<IFlight, TFlightStorage>,
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

    inAirFlights(id: number): IFlight[] {
        return this._ucflightDay.inAirFlights(id, this.storages);
    }

    onGroundPlanes(id: number): IPlane[] {
        return this._ucflightDay.onGroundPlanes(id, this.storages);
    }

    preparedFlights(id: number): IFlight[] {
        return this._ucflightDay.preparedFlights(id, this.storages);
    }

    setFlight(id: number, flight: IFlight): IFlightDay | null {
        return this._ucflightDay.setFlight(id, flight, this.storages);
    }


}