import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import IFlightDay from "@/lib/Interfaces/IFlightDay";

export default interface IFlight {
    id: number
    flightDay: IFlightDay
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