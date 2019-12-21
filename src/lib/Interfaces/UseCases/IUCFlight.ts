import IStorages from "@/lib/Interfaces/IStorages";
import IPerson from "@/lib/Interfaces/IPerson";
import IPlane from "@/lib/Interfaces/IPlane";
import IFlight from "@/lib/Interfaces/IFlight";

export default interface IUCFlight {
    create(date: Date, storage: IStorages): IFlight | null

    setTow(captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null

    setPlane(captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null

    prepare(prepared: boolean, storage: IStorages): IFlight | null

    start(date: Date, storage: IStorages): IFlight | null

    finish(date: Date, storage: IStorages): IFlight | null

    get(id: number, storage: IStorages): IFlight | null

    remove(id: number, storage: IStorages): void
}