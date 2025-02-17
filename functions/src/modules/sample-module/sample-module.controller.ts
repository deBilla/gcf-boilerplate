import {SampleModuleRepository} from "./sample-module.repository";
import {SampleModuleRequest} from "./dto/sample-module-request.dto";
import {SampleModuleEntity} from "./entities/sample-module.entity";
export class SampleModuleController {
  sampleModuleRepository: SampleModuleRepository;

  constructor() {
    this.sampleModuleRepository = new SampleModuleRepository();
  }

  async createSampleModule(newSampleModule: SampleModuleRequest) {
    return (await (this.sampleModuleRepository.create(SampleModuleEntity.fromRequest(newSampleModule)))).toTransformedObject();
  }

  async updateSampleModule(updatedSampleModule: SampleModuleRequest) {
    const sampleModule = SampleModuleEntity.fromRequest(updatedSampleModule);
    return await this.sampleModuleRepository.update(sampleModule);
  }

  async deleteSampleModule(uuid: string) {
    const sampleModule = await this.sampleModuleRepository.findOne(uuid);
    if (!sampleModule) throw new Error("<SampleModule> not found in database !!!");

    await this.sampleModuleRepository.delete(uuid);
  }

  async getAll() {
    const sampleModules: SampleModuleEntity[] = await this.sampleModuleRepository.find();

    if (!sampleModules || sampleModules.length <= 0) return [];

    return sampleModules.map((sampleModule: SampleModuleEntity) => sampleModule.toTransformedObject());
  }

  async getOne(uuid: string) {
    const sampleModule: SampleModuleEntity = await this.sampleModuleRepository.findOne(uuid);

    return sampleModule.toTransformedObject();
  }
}
