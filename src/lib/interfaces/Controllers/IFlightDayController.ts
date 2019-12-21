import IFlightDay from "@/lib/interfaces/IFlightDay";

export default interface IFlightDayController {

    addFlightDay(date: Date): IFlightDay | null
}