import {SampleModuleRepository} from "./sample-module.repository";
import {SampleModuleRequest} from "./dto/sample-module-request.dto";
import {SampleModuleEntity} from "./entities/sample-module.entity";
export class SampleModuleController {
  moduleRepository: SampleModuleRepository;

  constructor() {
    this.moduleRepository = new SampleModuleRepository();
  }

  async createSampleModule(req: SampleModuleRequest) {
    const module = new SampleModuleEntity({
      testField: req.test_field,
    } as SampleModuleEntity);
    await this.moduleRepository.create(module);

    return module;
  }

  async deleteSampleModule(uuid: string) {
    const module = await this.moduleRepository.findOne(uuid);
    if (!module) throw new Error("<SampleModule> not found in database !!!");

    await this.moduleRepository.delete(uuid);
  }

  async getAll() {
    const modules: SampleModuleEntity[] = await this.moduleRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((module: SampleModuleEntity) => module.toTransformedObject());
  }
}
