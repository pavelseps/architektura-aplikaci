import IPlane from "@/lib/Interfaces/IPlane";

export default interface IPlaneController {

    addPlane(callsign: string): IPlane | null
}