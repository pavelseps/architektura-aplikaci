import IStorage from "@/lib/Interfaces/IStorage";
import IPlane from "@/lib/Interfaces/IPlane";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IFlight from "@/lib/Interfaces/IFlight";
import IPerson from "@/lib/Interfaces/IPerson";

export default interface IStorages {
    planeStorage ?: IStorage<IPlane>
    personStorage ?: IStorage<IPerson>
    flightStorage ?: IStorage<IFlight>
    flightDayStorage ?: IStorage<IFlightDay>
};