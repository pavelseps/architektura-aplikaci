import {Container, interfaces} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IPlane from "@/lib/Interfaces/IPlane";
import IUCPlane from "@/lib/Interfaces/UseCases/IUCPlane";
import UCPlane from "@/lib/application_business_rules/use_cases/UCPlane";
import IPlaneController from "@/lib/Interfaces/Controllers/IPlaneController";
import PlaneController from "@/lib/interface_adapters/controllers/PlaneController";
import Plane from "@/lib/enterprise_business_rules/entities/Plane";
import IStorage from "@/lib/Interfaces/IStorage";
import PlaneStorage from "@/lib/interface_adapters/storage/PlaneStorage";
import IPerson from "@/lib/Interfaces/IPerson";
import IUCPerson from "@/lib/Interfaces/UseCases/IUCPerson";
import Person from "@/lib/enterprise_business_rules/entities/Person";
import UCPerson from "@/lib/application_business_rules/use_cases/UCPerson";
import IPersonController from "@/lib/Interfaces/Controllers/IPersonController";
import PersonController from "@/lib/interface_adapters/controllers/PersonController";
import PersonStorage from "@/lib/interface_adapters/storage/PersonStorage";
import IFlight from "@/lib/Interfaces/IFlight";
import IFlightController from "@/lib/Interfaces/Controllers/IFlightController";
import IUCFlight from "@/lib/Interfaces/UseCases/IUCFlight";
import UCFlight from "@/lib/application_business_rules/use_cases/UCFlight";
import Flight from "@/lib/enterprise_business_rules/entities/Flight";
import FlightStorage from "@/lib/interface_adapters/storage/FlightStorage";
import FlightController from "@/lib/interface_adapters/controllers/FlightController";
import IFlightDay from "@/lib/Interfaces/IFlightDay";
import IUCFlightDay from "@/lib/Interfaces/UseCases/IUCFlightDay";
import IFlightDayController from "@/lib/Interfaces/Controllers/IFlightDayController";
import FlightDayStorage from "@/lib/interface_adapters/storage/FlightDayStorage";
import FlightDayController from "@/lib/interface_adapters/controllers/FlightDayController";
import UCFlightDay from "@/lib/application_business_rules/use_cases/UCFlightDay";
import FlightDay from "@/lib/enterprise_business_rules/entities/FlightDay";

const container = new Container();
/**
 * Planes
 */
container.bind<IStorage<IPlane>>(TYPES.PlaneStorage).to(PlaneStorage).inSingletonScope();
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

container.bind<IStorage<IPerson>>(TYPES.PersonStorage).to(PersonStorage).inSingletonScope();
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

container.bind<IStorage<IFlight>>(TYPES.FlightStorage).to(FlightStorage).inSingletonScope();
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

container.bind<IStorage<IFlightDay>>(TYPES.FlightDayStorage).to(FlightDayStorage).inSingletonScope();
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