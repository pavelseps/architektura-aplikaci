import IPlane from "@/lib/interfaces/IPlane";

export default interface IPlaneController {

    addPlane(callsign: string): IPlane | null

    getAllPlanes(): IPlane[]

    getPlane(id: number): IPlane | null

    updatePlane(id: number, callsign: string): IPlane | null

    removePlane(id: number): void
}