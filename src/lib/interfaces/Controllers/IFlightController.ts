import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";

export default interface IFlightController {

    addFlight(date: Date): IFlight | null

    getFlight(id: number): IFlight | null

    setPlaneForFlight(id: number, captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null

    setTowPlaneForFlight(id: number, captain: IPerson, crew: IPerson[], plane: IPlane): IFlight | null

    removeFlight(id: number): void

    setFlightReady(id: number): IFlight | null

    setFlightWaiting(id: number): IFlight | null

    startFlight(id: number, date: Date): IFlight | null

    finishFlight(id: number, date: Date): IFlight | null
}