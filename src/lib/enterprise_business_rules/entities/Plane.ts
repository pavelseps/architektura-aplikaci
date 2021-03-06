import {injectable} from "inversify";
import IPlane from "@/lib/interfaces/IPlane";
import IPerson from "@/lib/interfaces/IPerson";
import "reflect-metadata";

@injectable()
export default class Plane implements IPlane {
    id: number;
    callsign: string;


    constructor() {
        this.id = 0;
        this.callsign = "";
    }

}