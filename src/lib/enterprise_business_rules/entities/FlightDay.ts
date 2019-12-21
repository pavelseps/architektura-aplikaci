import {injectable} from "inversify";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";

@injectable()
export default class FlightDay implements IFlightDay{
    id: number;
    date: Date;
    flights: IFlight[];
    persons: IPerson[];
    planes: IPlane[];


    constructor() {
        this.id = 0;
        this.date = new Date();
        this.flights = [];
        this.persons = [];
        this.planes = [];
    }


}