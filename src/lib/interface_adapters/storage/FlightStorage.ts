import IStorage from "@/lib/Interfaces/IStorage";
import {injectable} from "inversify";
import "reflect-metadata";
import IFlight from "@/lib/Interfaces/IFlight";

@injectable()
export default class FlightStorage implements IStorage<IFlight> {

    get(id: number): IFlight | null {
        return null;
    }

    getAll(): IFlight[] {
        return [];
    }

    remove(id: number): void {
    }

    update(id: number, data: IFlight): IFlight {
        return data;
    }

    create(data: IFlight): IFlight {
        console.log("Saving to local storage flight", data);
        return data;
    }
}