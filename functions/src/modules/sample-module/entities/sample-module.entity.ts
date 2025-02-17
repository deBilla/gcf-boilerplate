import {IEntity} from "../../../core/entity/entity.interface";
import {v4 as uuidv4} from "uuid";
import {transformToSnakeCase} from "../../../core/entity/entity.tranformer";
import { SampleModuleRequest } from "../dto/sample-module-request.dto";

export class SampleModuleEntity implements IEntity {
  uuid!: string;
  fullName!: string;

  constructor(data: Partial<SampleModuleEntity> = {}) {
    this.uuid = data.uuid || uuidv4();
    this.fullName = data.fullName || "";
  }

  getId(): string {
    return this.uuid;
  }

  toDatabaseObject() {
    return this.toTransformedObject();
  }

  toTransformedObject() {
    return transformToSnakeCase({...this});
  }

  static fromRequest(req: SampleModuleRequest): SampleModuleEntity {
    const entity = new SampleModuleEntity();
    const toSnakeCase = (str: string) =>
      str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

    Object.keys(entity).forEach((key) => {
      const snakeKey = toSnakeCase(key);
      (entity as any)[key] = req[snakeKey as keyof SampleModuleRequest] || (entity as any)[key];
    });

    return entity;
  }
}
