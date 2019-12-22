import IStorage from "@/lib/interfaces/IStorage";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import LocalStorageStorage from "@/lib/LocalStorageStorage";
import {TFlightDayStorage} from "@/lib/interfaces/Storages/TFlightDayStorage";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import {TYPES} from "@/lib/injection/types";
import IPerson from "@/lib/interfaces/IPerson";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";
import IPlane from "@/lib/interfaces/IPlane";
import {TPlaneStorage} from "@/lib/interfaces/Storages/TPlaneStorage";
import IFlight from "@/lib/interfaces/IFlight";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";

@injectable()
export default class FlightDayStorage implements IStorage<IFlightDay, TFlightDayStorage> {

    static STORAGE_NAME = "FlightDayStorage";

    private readonly _storage: LocalStorageStorage<TFlightDayStorage>;
    private readonly _flightDayFactory: () => IFlightDay;
    private readonly _personStorage: IStorage<IPerson, TPersonStorage>;
    private readonly _planeStorage: IStorage<IPlane, TPlaneStorage>;
    private readonly _flightStorage: IStorage<IFlight, TFlightStorage>;

    constructor(
        @inject(TYPES.FlightDayFactory) flightDayFactory: () => IFlightDay,
        @inject(TYPES.PersonStorage) personStorage: IStorage<IPerson, TPersonStorage>,
        @inject(TYPES.PlaneStorage) planeStorage: IStorage<IPlane, TPlaneStorage>,
        @inject(TYPES.FlightStorage) flightStorage: IStorage<IFlight, TFlightStorage>
    ) {
        this._flightDayFactory = flightDayFactory;
        this._personStorage = personStorage;
        this._planeStorage = planeStorage;
        this._flightStorage = flightStorage;
        this._storage = new LocalStorageStorage<TFlightDayStorage>(FlightDayStorage.STORAGE_NAME);
    }

    get(id: number): IFlightDay | null {
        return this.tytoin(this._storage.get(id));
    }

    getAll(): IFlightDay[] {
        return this._storage.getAll().map(x => this.tytoin(x));
    }

    remove(id: number): void {
        this._storage.remove(id);
    }

    update(id: number, data: IFlightDay): IFlightDay {
        return this.tytoin(this._storage.update(id, this.intoty(data)));
    }

    create(data: IFlightDay): IFlightDay {
        return this.tytoin(this._storage.create(this.intoty(data)));
    }


    intoty(data: IFlightDay): TFlightDayStorage {
        return {
            date: data.date.getTime().toString(),
            flights_id: data.flights.map(x => x.id),
            id: data.id,
            persons_id: data.persons.map(x => x.id),
            planes_id: data.planes.map(x => x.id)
        };
    }

    tytoin(data: TFlightDayStorage | null): IFlightDay {
        let instance = this._flightDayFactory();

        if (data === null) {
            return instance;
        }

        instance.id = data.id;
        instance.date = new Date(parseInt(data.date));
        instance.persons = this._personStorage.getAll()
            .filter(x => data.persons_id.includes(x.id));

        instance.planes = this._planeStorage.getAll()
            .filter(x => data.planes_id.includes(x.id));

        instance.flights = this._flightStorage.getAll()
            .filter(x => data.flights_id.includes(x.id));

        return instance;
    }
}