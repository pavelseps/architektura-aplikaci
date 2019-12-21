import {inject, injectable} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IStorage from "@/lib/interfaces/IStorage";
import IStorages from "@/lib/interfaces/IStorages";
import "reflect-metadata";
import IPersonController from "@/lib/interfaces/Controllers/IPersonController";
import IPerson from "@/lib/interfaces/IPerson";
import IUCPerson from "@/lib/interfaces/UseCases/IUCPerson";

@injectable()
export default class PersonController implements IPersonController{

    private readonly _storage : IStorage<IPerson>;
    private readonly _ucperson : IUCPerson;

    constructor(
        @inject(TYPES.PersonStorage) storage : IStorage<IPerson>,
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

    addPerson(name : string, surname: string){
        return this._ucperson.add(name, surname,  this.storages);
    }
}