import IPlane from "@/lib/interfaces/IPlane";
import IPerson from "@/lib/interfaces/IPerson";
import IFlightDay from "@/lib/interfaces/IFlightDay";

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