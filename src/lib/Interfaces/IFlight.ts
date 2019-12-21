import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";

export default interface IFlight {
    towPlane?: IPlane
    towCaptain?: IPerson
    towCrew?: IPerson[]

    date: Date

    startDate?: Date
    finishDate?: Date

    ready: boolean
    plane: IPlane
    captain: IPerson
    crew: IPerson[]
}