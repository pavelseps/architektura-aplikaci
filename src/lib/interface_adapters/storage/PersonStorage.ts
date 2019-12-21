import IStorage from "@/lib/interfaces/IStorage";
import {injectable} from "inversify";
import "reflect-metadata";
import IPerson from "@/lib/interfaces/IPerson";

@injectable()
export default class PersonStorage implements IStorage<IPerson> {

    get(id: number): IPerson | null {
        return null;
    }

    getAll(): IPerson[] {
        return [];
    }

    remove(id: number): void {
    }

    update(id: number, data: IPerson): IPerson {
        return data;
    }

    create(data: IPerson): IPerson {
        console.log("Saving to local storage person", data);
        return data;
    }
}