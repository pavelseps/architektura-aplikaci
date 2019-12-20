import {injectable} from "inversify";
import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import "reflect-metadata";

@injectable()
export default class Plane implements IPlane {
    callsign: string;
    name: string;
    owner!: IPerson;


    constructor() {
        this.callsign = "";
        this.name = "";
    }

}