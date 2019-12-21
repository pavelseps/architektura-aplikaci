import IPerson from "@/lib/Interfaces/IPerson";

export default interface IPlane {
    id: number
    callsign: string
    name: string
    owner: IPerson
}