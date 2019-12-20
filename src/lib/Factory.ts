import {Container, interfaces} from "inversify";
import {TYPES} from "@/lib/injection/types";
import IPlane from "@/lib/Interfaces/IPlane";
import IUCPlane from "@/lib/Interfaces/IUCPlane";
import UCPlane from "@/lib/application_business_rules/use_cases/UCPlane";
import IPlaneController from "@/lib/Interfaces/IPlaneController";
import PlaneController from "@/lib/interface_adapters/controllers/PlaneController";
import Plane from "@/lib/enterprise_business_rules/entities/Planes/Plane";
import PlaneRepository from "@/lib/application_business_rules/repositories/PlaneRepository";
import {IRepository} from "@/lib/Interfaces/IRepository";
import IStorage from "@/lib/Interfaces/IStorage";
import PlaneStorage from "@/lib/interface_adapters/storage/PlaneStorage";

const container = new Container();
/**
 * Planes
 */
container.bind<IRepository<IPlane>>(TYPES.PlaneRepository).to(PlaneRepository).inSingletonScope();
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
 *
 */

export const PlaneControllerDI = container.get<IPlaneController>(TYPES.PlaneController);

export default {PlaneControllerDI};