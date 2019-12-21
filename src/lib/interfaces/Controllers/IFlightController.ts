import IFlight from "@/lib/interfaces/IFlight";

export default interface IFlightController {

    addFlight(date: Date): IFlight | null
}