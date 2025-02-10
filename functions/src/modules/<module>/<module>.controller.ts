import {ModuleRepository} from "./<module>.repository";
import {ModuleRequest} from "./dto/<module>-request.dto";
import {ModuleEntity} from "./entities/<module>-job.entity";
export class ModuleController {
  moduleRepository: ModuleRepository;

  constructor() {
    this.moduleRepository = new ModuleRepository();
  }

  async createModule(req: ModuleRequest) {
    const module = new ModuleEntity({
      testField: req.test_field,
    } as ModuleEntity);
    await this.moduleRepository.create(module);

    return module;
  }

  async deleteModule(uuid: string) {
    const module = await this.moduleRepository.findOne(uuid);
    if (!module) throw new Error("<Module> not found in database !!!");

    await this.moduleRepository.delete(uuid);
  }

  async getAll() {
    const modules: ModuleEntity[] = await this.moduleRepository.find();

    if (!modules || modules.length <= 0) return [];

    return modules.map((module: ModuleEntity) => module.toTransformedObject());
  }
}
