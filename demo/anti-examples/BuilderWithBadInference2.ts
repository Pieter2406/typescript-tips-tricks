import { AssignablePropertiesOf } from '../../util-types';

type ConstructorType = new (...args: any) => any;

type ObjectWithConstructor<T> = T extends ConstructorType ? T : never;

export class BuilderWithBadInferences2<T extends new (...arg: any) => any> {
  private _object: InstanceType<T>;
  private _baseArgs: any[];
  // typescript feature: private/public
  constructor(private entityConstructor: ObjectWithConstructor<T>, ...args: ConstructorParameters<T>) {
    this._baseArgs = args;
    this._object = new entityConstructor(...this._baseArgs);
  }

  public with(
    property: keyof AssignablePropertiesOf<InstanceType<T>>,
    value: InstanceType<T>[keyof AssignablePropertiesOf<InstanceType<T>>],
  ): this {
    this._object[property] = value;
    return this;
  }

  public build(): InstanceType<T> {
    const newObj = new this.entityConstructor(...this._baseArgs);
    Object.assign(newObj, this._object);
    return newObj;
  }
}
