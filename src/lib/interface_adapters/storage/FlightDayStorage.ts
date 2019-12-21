import IStorage from "@/lib/interfaces/IStorage";
import {injectable} from "inversify";
import "reflect-metadata";
import IFlightDay from "@/lib/interfaces/IFlightDay";

@injectable()
export default class FlightDayStorage implements IStorage<IFlightDay> {

    get(id: number): IFlightDay | null {
        return null;
    }

    getAll(): IFlightDay[] {
        return [];
    }

    remove(id: number): void {
    }

    update(id: number, data: IFlightDay): IFlightDay {
        return data;
    }

    create(data: IFlightDay): IFlightDay {
        console.log("Saving to local storage flightday", data);
        return data;
    }
}