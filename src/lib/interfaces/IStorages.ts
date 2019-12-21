import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";

export default interface IStorages {
    planeStorage ?: IStorage<IPlane>
    personStorage ?: IStorage<IPerson>
    flightStorage ?: IStorage<IFlight>
    flightDayStorage ?: IStorage<IFlightDay>
};