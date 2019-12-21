import {injectable} from "inversify";
import IPerson from "@/lib/Interfaces/IPerson";

@injectable()
export default class Person implements IPerson{
    id: number;
    email: string;
    name: string;
    surname: string;

    constructor() {
        this.id = 0;
        this.email = "";
        this.name = "";
        this.surname = "";
    }

}