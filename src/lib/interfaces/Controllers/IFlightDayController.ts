import IFlightDay from "@/lib/interfaces/IFlightDay";
import IFlight from "@/lib/interfaces/IFlight";
import IPerson from "@/lib/interfaces/IPerson";
import IPlane from "@/lib/interfaces/IPlane";

export default interface IFlightDayController {

    addFlightDay(date: Date): IFlightDay | null


    getFlightDay(id: number): IFlightDay | null

    getAllFlightDays(): IFlightDay[]

    getFlightsOfDay(id: number): IFlight[]

    setFlight(id: number, flight: IFlight): IFlightDay | null

    removeFlight(id: number): void

    setPersonsToDay(id: number, persons: IPerson[]): IFlightDay | null

    setPlanesToDay(id: number, planes: IPlane[]): IFlightDay | null

    preparedFlights(id: number): IFlight[]

    onGroundPlanes(id: number): IPlane[]

    onGroundPersons(id: number): IPerson[]

    inAirFlights(id: number): IFlight[]
}