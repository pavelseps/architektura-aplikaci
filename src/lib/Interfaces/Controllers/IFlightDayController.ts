import IFlightDay from "@/lib/Interfaces/IFlightDay";

export default interface IFlightDayController {

    addFlightDay(date: Date): IFlightDay | null
}