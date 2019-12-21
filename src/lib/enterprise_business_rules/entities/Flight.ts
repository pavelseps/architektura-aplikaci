import {injectable} from "inversify";
import IFlight from "@/lib/interfaces/IFlight";
import IPlane from "@/lib/interfaces/IPlane";
import IPerson from "@/lib/interfaces/IPerson";

@injectable()
export default class Flight implements IFlight {
    id: number;
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