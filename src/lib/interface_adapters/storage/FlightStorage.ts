import IStorage from "@/lib/interfaces/IStorage";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import LocalStorageStorage from "@/lib/LocalStorageStorage";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";
import IFlight from "@/lib/interfaces/IFlight";
import {TYPES} from "@/lib/injection/types";
import IPerson from "@/lib/interfaces/IPerson";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";
import IPlane from "@/lib/interfaces/IPlane";
import {TPlaneStorage} from "@/lib/interfaces/Storages/TPlaneStorage";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import {TFlightDayStorage} from "@/lib/interfaces/Storages/TFlightDayStorage";

@injectable()
export default class FlightStorage implements IStorage<IFlight, TFlightStorage> {

    static STORAGE_NAME = "FlightStorage";

    private readonly _storage: LocalStorageStorage<TFlightStorage>;
    private readonly _flightFactory: () => IFlight;

    private readonly _personStorage: IStorage<IPerson, TPersonStorage>;
    private readonly _planeStorage: IStorage<IPlane, TPlaneStorage>;
    private readonly _flightDayStorage: IStorage<IFlightDay, TFlightDayStorage>;

    constructor(
        @inject(TYPES.FlightFactory) flightFactory: () => IFlight,
        @inject(TYPES.PersonStorage) personStorage: IStorage<IPerson, TPersonStorage>,
        @inject(TYPES.PlaneStorage) planeStorage: IStorage<IPlane, TPlaneStorage>,
        @inject(TYPES.FlightDayFactory) flightDayStorage: IStorage<IFlightDay, TFlightDayStorage>,
    ) {
        this._personStorage = personStorage;
        this._planeStorage = planeStorage;
        this._flightDayStorage = flightDayStorage;
        this._flightFactory = flightFactory;
        this._storage = new LocalStorageStorage<TFlightStorage>(FlightStorage.STORAGE_NAME);
    }

    get(id: number): IFlight | null {
        return this.tytoin(this._storage.get(id));
    }

    getAll(): IFlight[] {
        return this._storage.getAll().map(x => this.tytoin(x));
    }

    remove(id: number): void {
        this._storage.remove(id);
    }

    update(id: number, data: IFlight): IFlight {
        return this.tytoin(this._storage.update(id, this.intoty(data)));
    }

    create(data: IFlight): IFlight {
        return this.tytoin(this._storage.create(this.intoty(data)));
    }

    intoty(data: IFlight): TFlightStorage {
        let result: TFlightStorage = {
            id: data.id,
            captain_id: data.captain.id,
            crew_id: data.crew.map(x => x.id),
            date: data.date.toString(),
            flightDay_id: data.flightDay.id,
            plane_id: data.plane.id,
            ready: data.ready,

            finishDate: undefined,
            startDate: undefined,
            towCaptain_id: undefined,
            towCrew_id: undefined,
            towPlane_id: undefined
        };

        if (data.finishDate !== undefined) {
            result.finishDate = data.finishDate.toString();
        }

        if (data.startDate !== undefined) {
            result.startDate = data.startDate.toString();
        }

        if (data.towCaptain !== undefined) {
            result.towCaptain_id = data.towCaptain.id;
        }

        if (data.towCrew !== undefined) {
            result.towCrew_id = data.towCrew.map(x => x.id);
        }

        if (data.towPlane !== undefined) {
            result.towPlane_id = data.towPlane.id;
        }

        return result;
    }

    tytoin(data: TFlightStorage | null): IFlight {

        let instance = this._flightFactory();

        if (data === null) {
            return instance;
        }

        instance.id = data.id;
        instance.date = new Date(data.date);
        instance.startDate = data.startDate !== undefined ? new Date(data.startDate) : undefined;
        instance.finishDate = data.finishDate !== undefined ? new Date(data.finishDate) : undefined;
        instance.ready = data.ready;

        //TODO remove ts-ignore :(
        // @ts-ignore
        instance.flightDay = this._flightDayStorage.get(data.flightDay_id);
        // @ts-ignore
        instance.captain = this._personStorage.get(data.captain_id);
        instance.crew = this._personStorage.getAll()
            .filter(x => data.crew_id.includes(x.id));

        // @ts-ignore
        instance.plane = this._planeStorage.get(data.plane_id);

        if (data.towCaptain_id !== undefined){
            let towCaptain = this._personStorage.get(data.towCaptain_id);
            instance.towCaptain = towCaptain === null ? undefined : towCaptain;
        } else {
            instance.towCaptain = undefined;
        }

        if (data.towCrew_id !== undefined){
            instance.towCrew = this._personStorage.getAll()
                // @ts-ignore Fixed with if above
                .filter(x => data.towCrew_id.includes(x.id));
        } else {
            instance.towCrew = undefined;
        }

        if (data.towPlane_id !== undefined){
            let towPlane = this._planeStorage.get(data.towPlane_id);
            instance.towPlane = towPlane === null ? undefined : towPlane;
        } else {
            instance.towPlane = undefined;
        }


        return instance;
    }
}