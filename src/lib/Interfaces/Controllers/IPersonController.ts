import IPerson from "@/lib/Interfaces/IPerson";

export default interface IPersonController {

    addPerson(name: string, surname: string): IPerson | null
}