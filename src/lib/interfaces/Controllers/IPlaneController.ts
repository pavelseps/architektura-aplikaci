import IPlane from "@/lib/interfaces/IPlane";

export default interface IPlaneController {

    addPlane(callsign: string): IPlane | null
}