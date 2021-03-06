import {Container, interfaces} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IPlane from "@/lib/interfaces/IPlane";
import IUCPlane from "@/lib/interfaces/UseCases/IUCPlane";
import UCPlane from "@/lib/application_business_rules/use_cases/UCPlane";
import IPlaneController from "@/lib/interfaces/Controllers/IPlaneController";
import PlaneController from "@/lib/interface_adapters/controllers/PlaneController";
import Plane from "@/lib/enterprise_business_rules/entities/Plane";
import IStorage from "@/lib/interfaces/IStorage";
import PlaneStorage from "@/lib/interface_adapters/storage/PlaneStorage";
import IPerson from "@/lib/interfaces/IPerson";
import IUCPerson from "@/lib/interfaces/UseCases/IUCPerson";
import Person from "@/lib/enterprise_business_rules/entities/Person";
import UCPerson from "@/lib/application_business_rules/use_cases/UCPerson";
import IPersonController from "@/lib/interfaces/Controllers/IPersonController";
import PersonController from "@/lib/interface_adapters/controllers/PersonController";
import PersonStorage from "@/lib/interface_adapters/storage/PersonStorage";
import IFlight from "@/lib/interfaces/IFlight";
import IFlightController from "@/lib/interfaces/Controllers/IFlightController";
import IUCFlight from "@/lib/interfaces/UseCases/IUCFlight";
import UCFlight from "@/lib/application_business_rules/use_cases/UCFlight";
import Flight from "@/lib/enterprise_business_rules/entities/Flight";
import FlightStorage from "@/lib/interface_adapters/storage/FlightStorage";
import FlightController from "@/lib/interface_adapters/controllers/FlightController";
import IFlightDay from "@/lib/interfaces/IFlightDay";
import IUCFlightDay from "@/lib/interfaces/UseCases/IUCFlightDay";
import IFlightDayController from "@/lib/interfaces/Controllers/IFlightDayController";
import FlightDayStorage from "@/lib/interface_adapters/storage/FlightDayStorage";
import FlightDayController from "@/lib/interface_adapters/controllers/FlightDayController";
import UCFlightDay from "@/lib/application_business_rules/use_cases/UCFlightDay";
import FlightDay from "@/lib/enterprise_business_rules/entities/FlightDay";
import {TFlightDayStorage} from "@/lib/interfaces/Storages/TFlightDayStorage";
import {TFlightStorage} from "@/lib/interfaces/Storages/TFlightStorage";
import {TPersonStorage} from "@/lib/interfaces/Storages/TPersonStorage";
import {TPlaneStorage} from "@/lib/interfaces/Storages/TPlaneStorage";

const container = new Container();
/**
 * Planes
 */
container.bind<IStorage<IPlane, TPlaneStorage>>(TYPES.PlaneStorage).to(PlaneStorage).inSingletonScope();
container.bind<IUCPlane>(TYPES.UCPlane).to(UCPlane).inSingletonScope();
container.bind<IPlaneController>(TYPES.PlaneController).to(PlaneController).inSingletonScope();
container.bind<IPlane>(TYPES.Plane).to(Plane);

container.bind<interfaces.Factory<IPlane>>(TYPES.PlaneFactory).toFactory<IPlane>((context: interfaces.Context) => {
    return () => {
        return context.container.get<IPlane>(TYPES.Plane);
    };
});

/**
 * Person
 */

container.bind<IStorage<IPerson, TPersonStorage>>(TYPES.PersonStorage).to(PersonStorage).inSingletonScope();
container.bind<IUCPerson>(TYPES.UCPerson).to(UCPerson).inSingletonScope();
container.bind<IPersonController>(TYPES.PersonController).to(PersonController).inSingletonScope();
container.bind<IPerson>(TYPES.Person).to(Person);

container.bind<interfaces.Factory<IPerson>>(TYPES.PersonFactory).toFactory<IPerson>((context: interfaces.Context) => {
    return () => {
        return context.container.get<IPerson>(TYPES.Person);
    };
});

/**
 * Flight
 */

container.bind<IStorage<IFlight, TFlightStorage>>(TYPES.FlightStorage).to(FlightStorage).inSingletonScope();
container.bind<IUCFlight>(TYPES.UCFlight).to(UCFlight).inSingletonScope();
container.bind<IFlightController>(TYPES.FlightController).to(FlightController).inSingletonScope();
container.bind<IFlight>(TYPES.Flight).to(Flight);

container.bind<interfaces.Factory<IFlight>>(TYPES.FlightFactory).toFactory<IFlight>((context: interfaces.Context) => {
    return () => {
        return context.container.get<IFlight>(TYPES.Flight);
    };
});

/**
 * Flight day
 */

container.bind<IStorage<IFlightDay, TFlightDayStorage>>(TYPES.FlightDayStorage).to(FlightDayStorage).inSingletonScope();
container.bind<IUCFlightDay>(TYPES.UCFlightDay).to(UCFlightDay).inSingletonScope();
container.bind<IFlightDayController>(TYPES.FlightDayController).to(FlightDayController).inSingletonScope();
container.bind<IFlightDay>(TYPES.FlightDay).to(FlightDay);

container.bind<interfaces.Factory<IFlightDay>>(TYPES.FlightDayFactory).toFactory<IFlightDay>((context: interfaces.Context) => {
    return () => {
        return context.container.get<IFlightDay>(TYPES.FlightDay);
    };
});

export const PlaneControllerDI = container.get<IPlaneController>(TYPES.PlaneController);
export const PersonControllerDI = container.get<IPersonController>(TYPES.PersonController);
export const FlightControllerDI = container.get<IFlightController>(TYPES.FlightController);
export const FlightDayControllerDI = container.get<IFlightDayController>(TYPES.FlightDayController);

export default {
    PlaneControllerDI,
    PersonControllerDI,
    FlightControllerDI,
    FlightDayControllerDI
};