import IStorages from "@/lib/Interfaces/IStorages";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "@/lib/injection/types";
import IUCPerson from "@/lib/Interfaces/UseCases/IUCPerson";
import IPerson from "@/lib/Interfaces/IPerson";

@injectable()
export default class UCPerson implements IUCPerson {

    private readonly _personFactory: () => IPerson;

    constructor(
        @inject(TYPES.PersonFactory) personFactory: () => IPerson,
    ) {

        this._personFactory = personFactory;
    }

    add(name: string, surname: string, {personStorage}: IStorages) {

        if (personStorage !== undefined) {
            let person = this._personFactory();
            person.name = name;
            person.surname = surname;

            return personStorage.create(person);
        }

        return null;
    }

    getAll({personStorage}: IStorages){

        if (personStorage !== undefined) {
            return personStorage.getAll();
        }

        return [];
    }

    get(id: number, {personStorage}: IStorages){

        if (personStorage !== undefined) {
            return personStorage.get(id);
        }

        return null;
    }

    update(id: number, name: string, surname: string,  {personStorage}: IStorages){

        if (personStorage !== undefined) {
            let person = this._personFactory();
            person.name = name;
            person.surname = surname;

            return personStorage.update(id, person);
        }

        return null;
    }

    remove(id: number, {personStorage}: IStorages){
        if (personStorage !== undefined) {
            personStorage.remove(id);
        }
    }
}