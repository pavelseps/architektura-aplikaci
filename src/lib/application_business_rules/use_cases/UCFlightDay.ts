import IUCFlightDay from "@/lib/Interfaces/UseCases/IUCFlightDay";
import IStorages from "@/lib/Interfaces/IStorages";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IFlight from "@/lib/Interfaces/IFlight";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";
import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import "reflect-metadata";

@injectable()
export default class UCFlightDay implements IUCFlightDay{

    private readonly _flightDayFactory: () => IFlightDay;

    constructor(
        @inject(TYPES.FlightDayFactory) flightDayFactory: () => IFlightDay,
    ) {

        this._flightDayFactory = flightDayFactory;
    }

    create(date: Date, {flightDayStorage}: IStorages): IFlightDay | null {
        if (flightDayStorage !== undefined) {
            let flight = this._flightDayFactory();
            flight.date = date;

            return flightDayStorage.create(flight);
        }

        return null;
    }

    get(id: number, storage: IStorages): IFlightDay | null {
        return null;
    }

    getAll(storage: IStorages): IFlightDay[] {
        return [];
    }

    getFlights(id: number, storage: IStorages): IFlight[] {
        return [];
    }

    remove(id: number, storage: IStorages): void {
    }

    setPersons(id: number, persons: IPerson[], storage: IStorages): IFlightDay | null {
        return null;
    }

    setPlanes(id: number, planes: IPlane[], storage: IStorages): IFlightDay | null {
        return null;
    }

}