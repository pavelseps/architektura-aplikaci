import {injectable} from "inversify";
import IPerson from "@/lib/Interfaces/IPerson";

@injectable()
export default class Person implements IPerson{
    email: string;
    name: string;
    surname: string;

    constructor() {
        this.email = "";
        this.name = "";
        this.surname = "";
    }

}