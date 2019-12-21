import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import IFlight from "@/lib/Interfaces/IFlight";

export default interface IFlightDay {
    id: number
    planes: IPlane[]
    persons: IPerson[]
    date: Date
    flights: IFlight[]
}