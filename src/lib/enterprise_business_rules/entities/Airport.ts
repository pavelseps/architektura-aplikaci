import {injectable} from "inversify";
import IAirport from "@/lib/Interfaces/IAirport";

@injectable()
export default class Airport implements IAirport {
    callsign: string;


    constructor(call: string) {
        this.callsign = call;

    }

}