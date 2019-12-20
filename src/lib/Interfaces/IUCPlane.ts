import IPlane from "@/lib/Interfaces/IPlane";
import IStorages from "@/lib/Interfaces/IStorages";

export default interface IUCPlane {
    addPlane(callsign: string, storage: IStorages): IPlane
}