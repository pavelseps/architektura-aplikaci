import IPlane from "@/lib/Interfaces/IPlane";
import IStorages from "@/lib/Interfaces/IStorages";

export default interface IUCPlane {
    add(callsign: string, storage: IStorages): IPlane | null

    getAll(storage: IStorages): IPlane[]

    get(id: number, storage: IStorages): IPlane | null

    update(id: number, callsign: string, storage: IStorages): IPlane | null

    remove(id: number, storage: IStorages): void
}