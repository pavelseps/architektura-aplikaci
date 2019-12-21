import IPerson from "@/lib/interfaces/IPerson";

export default interface IPersonController {

    addPerson(name: string, surname: string): IPerson | null
}