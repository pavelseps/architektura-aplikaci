import IPerson from "@/lib/Interfaces/IPerson";

export default interface IPlane {
    callsign: string
    name: string
    owner: IPerson
}