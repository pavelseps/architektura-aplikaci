import IStorages from "@/lib/Interfaces/IStorages";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";
import IFlight from "@/lib/Interfaces/IFlight";

export default interface IUCFlight {
    create(date: Date, storage: IStorages): IFlight | null

    setTow(id: number, captain: IPerson, crew: IPerson[], plane: IPlane, storage: IStorages): IFlight | null

    setPlane(id: number, captain: IPerson, crew: IPerson[], plane: IPlane, storage: IStorages): IFlight | null

    prepare(id: number, prepared: boolean, storage: IStorages): IFlight | null

    start(id: number, date: Date, storage: IStorages): IFlight | null

    finish(id: number, date: Date, storage: IStorages): IFlight | null

    get(id: number, storage: IStorages): IFlight | null

    remove(id: number, storage: IStorages): void
}