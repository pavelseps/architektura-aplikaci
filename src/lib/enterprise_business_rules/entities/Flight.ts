import {injectable} from "inversify";
import IFlight from "@/lib/interfaces/IFlight";
import IPlane from "@/lib/interfaces/IPlane";
import IPerson from "@/lib/interfaces/IPerson";
import IFlightDay from "@/lib/interfaces/IFlightDay";

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