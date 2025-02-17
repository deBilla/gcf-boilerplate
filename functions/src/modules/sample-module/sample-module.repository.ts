import {FirestoreRepository} from "../../core/firestore/firestore.base";
import configurations from "../../server-config/configurations";
import {SampleModuleEntity} from "./entities/sample-module.entity";

export class SampleModuleRepository extends FirestoreRepository<SampleModuleEntity> {
  constructor() {
    super(configurations().firestore.sampleModuleTable.dbName, configurations().firestore.sampleModuleTable.name);
  }

  protected docToEntity(
    doc: FirebaseFirestore.DocumentSnapshot
  ): SampleModuleEntity {
    const metadata = new SampleModuleEntity({
      uuid: doc.get("uuid") || "",
      testField: doc.get("test_field") || "",
    } as SampleModuleEntity);

    return metadata;
  }
}
