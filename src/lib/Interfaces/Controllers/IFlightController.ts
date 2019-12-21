import IFlight from "@/lib/Interfaces/IFlight";

export default interface IFlightController {

    addFlight(date: Date): IFlight | null
}