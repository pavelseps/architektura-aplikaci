import {injectable} from "inversify";
import IFlight from "@/lib/Interfaces/IFlight";
import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import {plan} from "inversify/dts/planning/planner";

@injectable()
export default class Flight implements IFlight {
    captain: IPerson;
    crew: IPerson[];
    finishDate?: Date;
    plane: IPlane;
    ready: boolean;
    startDate?: Date;
    towCaptain?: IPerson;
    towCrew?: IPerson[];
    towPlane?: IPlane;


    constructor(plane: IPlane, captain: IPerson, crew: IPerson[], towPlane ?: IPlane, towCaptain ?: IPerson, towCrew ?: IPerson[]) {
        this.ready = false;

        this.captain = captain;
        this.crew = crew;
        this.plane = plane;

        this.towCaptain = towCaptain;
        this.towCrew = towCrew;
        this.towPlane = towPlane;

    }
}