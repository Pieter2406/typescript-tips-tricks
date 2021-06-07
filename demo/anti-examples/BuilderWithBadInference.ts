import { AssignablePropertiesOf } from '../../util-types';

type ConstructorOfType<T> = T extends { new (...args: any): any } ? T : never;
type ConstructorType = new (...args: any) => any;

export class BuilderWithBadInferences<T extends new (...arg: any) => any> {
  private _object: InstanceType<T>;
  private _baseArgs: any[];
  // typescript feature: private/public
  constructor(private entityConstructor: ConstructorType, ...args: ConstructorParameters<T>) {
    this._baseArgs = args;
    this._object = new entityConstructor(...this._baseArgs);
  }

  public with<V extends keyof AssignablePropertiesOf<InstanceType<T>>>(property: V, value: InstanceType<T>[V]): this {
    this._object[property] = value;
    return this;
  }

  public build(): InstanceType<T> {
    const newObj = new this.entityConstructor(...this._baseArgs);
    Object.assign(newObj, this._object);
    return newObj;
  }
}
