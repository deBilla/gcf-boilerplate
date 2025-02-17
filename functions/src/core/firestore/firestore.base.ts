import {getFirestore} from "firebase-admin/firestore";
import {WhereFilterOp} from "@google-cloud/firestore";
import {IEntity} from "../entity/entity.interface";

export abstract class FirestoreRepository<T extends IEntity> {
  private database;
  private collectionName: string;

  constructor(dbName: string, collectionName: string) {
    this.database = getFirestore(dbName);
    this.collectionName = collectionName;
  }

  async create(item: T): Promise<T> {
    const document = this.database.doc(
      `${this.collectionName}/${item.getId()}`
    );
    await document.set(item.toDatabaseObject());
    return item;
  }

  async update(item: T): Promise<boolean> {
    const document = this.database.doc(
      `${this.collectionName}/${item.getId()}`
    );
    await document.update(item.toDatabaseObject());
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const document = this.database.doc(`${this.collectionName}/${id}`);
    await document.delete();
    return true;
  }

  async findOne(id: string): Promise<T> {
    const document = this.database.doc(`${this.collectionName}/${id}`);
    const doc = await document.get();
    if (!doc.exists) {
      throw new Error("Record Not Found");
    }
    return this.docToEntity(doc);
  }

  async find(): Promise<T[]> {
    const collectionRef = this.database.collection(this.collectionName);
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => this.docToEntity(doc));
  }

  async findByCondition(
    field: string,
    operator: WhereFilterOp,
    value: string
  ): Promise<T[] | null> {
    const collectionRef = this.database.collection(this.collectionName);
    const snapshot = await collectionRef.where(field, operator, value).get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs.map((doc) => this.docToEntity(doc));
  }

  protected abstract docToEntity(doc: FirebaseFirestore.DocumentSnapshot): T;
}
