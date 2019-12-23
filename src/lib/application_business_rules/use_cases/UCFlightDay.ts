import IUCFlightDay from "@/lib/interfaces/UseCases/IUCFlightDay";
import IStorages from "@/lib/interfaces/IStorages";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";
import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import "reflect-metadata";

@injectable()
export default class UCFlightDay implements IUCFlightDay {

    private static RESULT_HEADER = ["Imatrikulace", "Posádka", "Čas vzletu", "Čas přistání", "Celková doba letu", "Číslo letu"];
    private static RESULT_TOTAL_HEADER = ["Imatrikulace", "", "Celkový čas", "Počet letů", "", ""];

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

    getFlights(id: number, {flightDayStorage}: IStorages): IFlight[] {
        if (flightDayStorage !== undefined) {
            let flightsD = flightDayStorage.getAll();

            return []; //TODO remove
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

    preparedFlights(id: number, {flightDayStorage}: IStorages): IFlight[] {
        let date = this.get(id, {flightDayStorage});

        if (date === null) {
            return [];
        }


        return date.flights.filter(x => x.ready && x.startDate === undefined && x.finishDate === undefined);
    }

    onGroundPlanes(id: number, {flightDayStorage}: IStorages): IPlane[] {
        let date = this.get(id, {flightDayStorage});

        if (date === null) {
            return [];
        }

        let idPlanesUsed: number[] = [];
        for (let flight of date.flights) {

            if (
                (flight.ready && flight.startDate === undefined && flight.finishDate === undefined)
                || (flight.startDate !== undefined && flight.finishDate === undefined)
            ) {
                idPlanesUsed.push(flight.plane.id);
                if (flight.towPlane !== undefined) {
                    idPlanesUsed.push(flight.towPlane.id);
                }
            }
        }

        return date.planes.filter(x => !idPlanesUsed.includes(x.id));
    }

    inAirFlights(id: number, {flightDayStorage}: IStorages): IFlight[] {
        let date = this.get(id, {flightDayStorage});

        if (date === null) {
            return [];
        }

        return date.flights.filter(x => x.startDate !== undefined && x.finishDate === undefined);
    }

    setFlight(id: number, flight: IFlight, {flightDayStorage}: IStorages): IFlightDay | null {
        let date = this.get(id, {flightDayStorage});

        if (date === null || flightDayStorage === undefined) {
            return null;
        }
        date.flights.push(flight);

        return flightDayStorage.update(id, date);
    }

    onGroundPersons(id: number, {flightDayStorage}: IStorages): IPerson[] {
        let date = this.get(id, {flightDayStorage});

        if (date === null) {
            return [];
        }

        let idPlanesUsed: number[] = [];
        for (let flight of date.flights) {

            if (
                (flight.ready && flight.startDate === undefined && flight.finishDate === undefined)
                || (flight.startDate !== undefined && flight.finishDate === undefined)
            ) {
                idPlanesUsed.push(flight.captain.id);
                if (flight.towCaptain !== undefined) {
                    idPlanesUsed.push(flight.towCaptain.id);
                }
            }
        }

        return date.persons.filter(x => !idPlanesUsed.includes(x.id));
    }

    generateReport(id: number, {flightDayStorage}: IStorages): string[][] {
        let date = this.get(id, {flightDayStorage});

        if (date === null) {
            return [];
        }

        let result: string[][] = [];
        result.push(UCFlightDay.RESULT_HEADER);
        let it = 1;

        let totalTimes : {[callsign : string] : any} = {};

        for (let flight of date.flights) {

            if (flight.startDate !== undefined && flight.finishDate !== undefined) {
                let totalTime = new Date(flight.finishDate.getTime() - flight.startDate.getTime());

                if (totalTimes[flight.plane.callsign] === undefined){
                    totalTimes[flight.plane.callsign] = {
                        count: 1,
                        totalTime: totalTime.getTime()
                    };
                } else {
                    totalTimes[flight.plane.callsign].count ++;
                    totalTimes[flight.plane.callsign].totalTime += totalTime.getTime();
                }

                result.push([
                    flight.plane.callsign,
                    `${flight.captain.surname} ${flight.captain.name}`,
                    `${flight.startDate.getHours()}:${flight.startDate.getMinutes()}`,
                    `${flight.finishDate.getHours()}:${flight.finishDate.getMinutes()}`,
                    `${totalTime.getHours() - 1}:${totalTime.getMinutes()}`,
                    (it++).toString()
                ]);


            }
        }
        result.push(new Array(UCFlightDay.RESULT_HEADER.length));
        result.push(new Array(UCFlightDay.RESULT_HEADER.length));
        result.push(UCFlightDay.RESULT_TOTAL_HEADER);

        for (let key in totalTimes){
            let time = new Date(totalTimes[key].totalTime);

            result.push([
                key,
                "",
                `${time.getHours() - 1}:${time.getMinutes()}`,
                totalTimes[key].count.toString(),
                "",
                "",
            ]);
        }

        return result;
    }
}