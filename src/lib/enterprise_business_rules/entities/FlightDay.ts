import {injectable} from "inversify";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IFlight from "@/lib/Interfaces/IFlight";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";

@injectable()
export default class FlightDay implements IFlightDay{
    day: Date;
    flights: IFlight[];
    persons: IPerson[];
    planes: IPlane[];


    constructor() {
        this.day = new Date();
        this.flights = [];
        this.persons = [];
        this.planes = [];
    }


}