import IPlane from "@/lib/Interfaces/IPlane";
import IPerson from "@/lib/Interfaces/IPerson";
import IFlight from "@/lib/Interfaces/IFlight";

export default interface IFlightDay {
    planes: IPlane[]
    persons: IPerson[]
    day: Date
    flights: IFlight[]
}