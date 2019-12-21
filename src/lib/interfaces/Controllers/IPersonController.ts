import IPerson from "@/lib/interfaces/IPerson";

export default interface IPersonController {

    addPerson(name: string, surname: string, email : string): IPerson | null

    getAllPersons(): IPerson[]

    getPerson(id: number): IPerson | null

    updatePerson(id: number, name: string, surname: string, email : string): IPerson | null

    removePerson(id: number): void
}