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
export default class UCFlightDay implements IUCFlightDay {

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

    get(id: number, {flightDayStorage}: IStorages): IFlightDay | null {
        if (flightDayStorage !== undefined) {
            return flightDayStorage.get(id);
        }

        return null;
    }

    getAll({flightDayStorage}: IStorages): IFlightDay[] {
        if (flightDayStorage !== undefined) {
            return flightDayStorage.getAll();
        }

        return [];
    }

    getFlights(id: number, {flightStorage}: IStorages): IFlight[] {
        if (flightStorage !== undefined) {
            let flights = flightStorage.getAll();

            return flights.filter(x => x.flightDay.id === id);
        }

        return [];
    }

    remove(id: number, {flightDayStorage}: IStorages): void {

        if (flightDayStorage !== undefined) {
            flightDayStorage.remove(id);
        }
    }

    setPersons(id: number, persons: IPerson[], {flightDayStorage}: IStorages): IFlightDay | null {
        if (flightDayStorage !== undefined) {
            let flightDay = flightDayStorage.get(id);
            if (flightDay === null) {
                return null;
            }

            flightDay.persons = persons;

            flightDayStorage.update(id, flightDay);
        }

        return null;
    }

    setPlanes(id: number, planes: IPlane[], {flightDayStorage}: IStorages): IFlightDay | null {
        if (flightDayStorage !== undefined) {
            let flightDay = flightDayStorage.get(id);
            if (flightDay === null) {
                return null;
            }

            flightDay.planes = planes;

            flightDayStorage.update(id, flightDay);
        }

        return null;
    }

}