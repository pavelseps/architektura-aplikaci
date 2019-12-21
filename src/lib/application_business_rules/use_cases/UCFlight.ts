import IUCFlight from "@/lib/Interfaces/UseCases/IUCFlight";
import IStorages from "@/lib/Interfaces/IStorages";
import IFlight from "@/lib/Interfaces/IFlight";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";
import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import "reflect-metadata";

@injectable()
export default class UCFlight implements IUCFlight{

    private readonly _flightFactory: () => IFlight;

    constructor(
        @inject(TYPES.FlightFactory) flightFactory: () => IFlight,
    ) {

        this._flightFactory = flightFactory;
    }

    create(date: Date, {flightStorage}: IStorages): IFlight | null {
        if (flightStorage !== undefined) {
            let flight = this._flightFactory();
            flight.date = date;

            return flightStorage.create(flight);
        }

        return null;
    }

    finish(date: Date, storage: IStorages): IFlight | null {
        return null;
    }

    get(id: number, storage: IStorages): IFlight | null {
        return null;
    }

    prepare(prepared: boolean, storage: IStorages): IFlight | null {
        return null;
    }

    remove(id: number, storage: IStorages): void {
    }

    setPlane(captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null {
        return null;
    }

    setTow(captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null {
        return null;
    }

    start(date: Date, storage: IStorages): IFlight | null {
        return null;
    }

}