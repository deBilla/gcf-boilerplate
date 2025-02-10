import {FirestoreRepository} from "../../core/firestore/firestore.base";
import configurations from "../../server-config/configurations";
import {ModuleEntity} from "./entities/<module>-job.entity";

export class ModuleRepository extends FirestoreRepository<ModuleEntity> {
  constructor() {
    super(configurations().firestore.testTable.dbName, configurations().firestore.testTable.name);
  }

  protected docToEntity(
    doc: FirebaseFirestore.DocumentSnapshot
  ): ModuleEntity {
    const metadata = new ModuleEntity({
      uuid: doc.get("uuid") || "",
      testField: doc.get("test_field") || "",
    } as ModuleEntity);

    return metadata;
  }
}
