import IStorages from "@/lib/interfaces/IStorages";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";
import IFlight from "@/lib/interfaces/IFlight";

export default interface IUCFlightDay {
    create(date : Date, storage: IStorages): IFlightDay | null

    setPersons(id: number, persons : IPerson[], storage: IStorages): IFlightDay | null

    setPlanes(id: number, planes : IPlane[], storage: IStorages): IFlightDay | null

    getFlights(id: number, storage: IStorages): IFlight[]

    getAll(storage: IStorages): IFlightDay[]

    get(id: number, storage: IStorages): IFlightDay | null

    remove(id: number, storage: IStorages): void
}