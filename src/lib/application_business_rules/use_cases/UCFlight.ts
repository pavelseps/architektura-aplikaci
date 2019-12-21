import IUCFlight from "@/lib/interfaces/UseCases/IUCFlight";
import IStorages from "@/lib/interfaces/IStorages";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";
import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import "reflect-metadata";

@injectable()
export default class UCFlight implements IUCFlight {

    private readonly _flightFactory: () => IFlight;

    constructor(
        @inject(TYPES.FlightFactory) flightFactory: () => IFlight,
    ) {

        this._flightFactory = flightFactory;
    }

    create(date: Date, captain: IPerson, crew: IPerson[], plane: IPlane, {flightStorage}: IStorages): IFlight | null {
        if (flightStorage !== undefined) {
            let flight = this._flightFactory();
            flight.date = date;
            flight.captain = captain;
            flight.crew = crew;
            flight.plane = plane;

            return flightStorage.create(flight);
        }

        return null;
    }

    finish(id: number, date: Date, {flightStorage}: IStorages): IFlight | null {

        if (flightStorage !== undefined) {
            let flight = flightStorage.get(id);
            if (flight === null) {
                return null;
            }

            flight.finishDate = date;

            return flight
        }

        return null;
    }

    get(id: number, {flightStorage}: IStorages): IFlight | null {
        if (flightStorage !== undefined) {
            return flightStorage.get(id);
        }

        return null;
    }

    prepare(id: number, prepared: boolean, {flightStorage}: IStorages): IFlight | null {

        if (flightStorage !== undefined) {
            let flight = flightStorage.get(id);
            if (flight === null) {
                return null;
            }

            flight.ready = prepared;

            return flight
        }

        return null;
    }

    remove(id: number, {flightStorage}: IStorages): void {
        if (flightStorage !== undefined) {
            flightStorage.remove(id);
        }
    }

    setPlane(id: number, captain: IPerson, crew: IPerson[], plane: IPlane, {flightStorage}: IStorages): IFlight | null {

        if (flightStorage !== undefined) {
            let flight = flightStorage.get(id);
            if (flight === null) {
                return null;
            }

            flight.captain = captain;
            flight.crew = crew;
            flight.plane = plane;

            return flight
        }
        return null;
    }

    setTow(id: number, captain: IPerson, crew: IPerson[], plane: IPlane, {flightStorage}: IStorages): IFlight | null {

        if (flightStorage !== undefined) {
            let flight = flightStorage.get(id);
            if (flight === null) {
                return null;
            }

            flight.towCaptain = captain;
            flight.towCrew = crew;
            flight.towPlane = plane;

            return flight
        }

        return null;
    }

    start(id: number, date: Date, {flightStorage}: IStorages): IFlight | null {

        if (flightStorage !== undefined) {
            let flight = flightStorage.get(id);
            if (flight === null) {
                return null;
            }

            flight.startDate = date;

            return flight
        }

        return null;
    }

}