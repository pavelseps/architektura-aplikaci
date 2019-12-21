import {injectable} from "inversify";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IFlight from "@/lib/Interfaces/IFlight";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";

@injectable()
export default class FlightDay implements IFlightDay{
    date: Date;
    flights: IFlight[];
    persons: IPerson[];
    planes: IPlane[];


    constructor() {
        this.date = new Date();
        this.flights = [];
        this.persons = [];
        this.planes = [];
    }


}