import { PrimitiveKeysOf } from '../util-types';
declare global {
  interface Array<T> {
    findByProperty<P extends PrimitiveKeysOf<T>>(propertyName: P, propertyValue: T[P]): T | undefined;
  }
}
