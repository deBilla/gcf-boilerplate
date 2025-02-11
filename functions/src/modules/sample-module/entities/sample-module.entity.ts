import {IEntity} from "../../../core/entity/entity.interface";
import {v4 as uuidv4} from "uuid";
import {transformToSnakeCase} from "../../../core/entity/entity.tranformer";

export class SampleModuleEntity implements IEntity {
  uuid!: string;
  testField!: string;

  constructor(data: SampleModuleEntity) {
    this.uuid = data.uuid || uuidv4();
    this.testField = data.testField || "";
  }

  getId(): string {
    return this.uuid;
  }

  toFirestoreObject() {
    return this.toTransformedObject();
  }

  toTransformedObject() {
    return transformToSnakeCase({
      uuid: this.uuid || uuidv4(),
      testField: this.testField || "",
    });
  }
}
