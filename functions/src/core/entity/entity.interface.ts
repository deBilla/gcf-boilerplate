export interface IEntity {
  getId(): string;
  toDatabaseObject(): any;
  toTransformedObject(): any;
}
