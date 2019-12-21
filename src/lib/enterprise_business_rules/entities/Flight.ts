import {injectable} from "inversify";
import IFlight from "@/lib/Interfaces/IFlight";
import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import {plan} from "inversify/dts/planning/planner";

@injectable()
export default class Flight implements IFlight {
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
        this.ready = false;
        this.date = new Date();
    }
}