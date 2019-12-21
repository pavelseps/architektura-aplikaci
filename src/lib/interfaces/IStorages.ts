import IStorage from "@/lib/interfaces/IStorage";
import IPlane from "@/lib/interfaces/IPlane";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import {TPlaneStorage} from "@/lib/interfaces/Storages/TPlaneStorage";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";
import {TFlightDayStorage} from "@/lib/interfaces/Storages/TFlightDayStorage";

export default interface IStorages {
    planeStorage ?: IStorage<IPlane, TPlaneStorage>
    personStorage ?: IStorage<IPerson, TPersonStorage>
    flightStorage ?: IStorage<IFlight, TFlightStorage>
    flightDayStorage ?: IStorage<IFlightDay, TFlightDayStorage>
};