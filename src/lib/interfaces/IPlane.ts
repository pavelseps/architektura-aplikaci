import IPerson from "@/lib/interfaces/IPerson";

export default interface IPlane {
    id: number
    callsign: string
    name: string
    owner: IPerson
}