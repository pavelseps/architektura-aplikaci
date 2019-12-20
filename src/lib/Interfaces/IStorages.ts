import IStorage from "@/lib/Interfaces/IStorage";
import IPlane from "@/lib/Interfaces/IPlane";

export default interface IStorages {
    planeStorage ?: IStorage<IPlane>
};