import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IStorages from "@/lib/interfaces/IStorages";
import "reflect-metadata";
import IPersonController from "@/lib/interfaces/Controllers/IPersonController";
import IPerson from "@/lib/interfaces/IPerson";
import IUCPerson from "@/lib/interfaces/UseCases/IUCPerson";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";

@injectable()
export default class PersonController implements IPersonController{

    private readonly _storage : IStorage<IPerson, TPersonStorage>;
    private readonly _ucperson : IUCPerson;

    constructor(
        @inject(TYPES.PersonStorage) storage : IStorage<IPerson, TPersonStorage>,
        @inject(TYPES.UCPerson) ucplane : IUCPerson
    ) {

        this._storage = storage;
        this._ucperson = ucplane;

    }

    private get storages() : IStorages{
        return {
            personStorage: this._storage
        }
    }

    addPerson(name : string, surname: string, email : string){
        return this._ucperson.add(name, surname, email, this.storages);
    }

    getAllPersons(): IPerson[] {
        return this._ucperson.getAll(this.storages);
    }

    getPerson(id: number): IPerson | null {
        return this._ucperson.get(id, this.storages);
    }

    removePerson(id: number): void {
        this._ucperson.remove(id, this.storages);
    }

    updatePerson(id: number, name: string, surname: string, email: string): IPerson | null {
        return this._ucperson.update(id, name, surname, email, this.storages);
    }
}