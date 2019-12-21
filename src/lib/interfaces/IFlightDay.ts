import IPlane from "@/lib/interfaces/IPlane";
import IPerson from "@/lib/interfaces/IPerson";
import IFlight from "@/lib/interfaces/IFlight";

export default interface IFlightDay {
    id: number
    planes: IPlane[]
    persons: IPerson[]
    date: Date
    flights: IFlight[]
}