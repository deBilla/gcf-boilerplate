export interface IEntity {
  getId(): string;
  toFirestoreObject(): any;
}
