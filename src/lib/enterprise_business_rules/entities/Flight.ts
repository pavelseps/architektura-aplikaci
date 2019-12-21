import {injectable} from "inversify";
import IFlight from "@/lib/Interfaces/IFlight";
import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import IFlightDay from "@/lib/Interfaces/IFlightDay";

@injectable()
export default class Flight implements IFlight {
    id: number;
    flightDay!: IFlightDay;
    captain!: IPerson;
    crew!: IPerson[];
    finishDate?: Date;
    plane !: IPlane;
    ready: boolean;
    date: Date;
    startDate?: Date;
    towCaptain?: IPerson;
    towCrew?: IPerson[];
    towPlane?: IPlane;


    constructor() {
        this.id = 0;
        this.ready = false;
        this.date = new Date();
    }
}