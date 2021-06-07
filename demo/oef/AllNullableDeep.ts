import { DeepNullable } from 'ts-essentials';

// bekijk mapped types van typescript
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

interface Test {
  a: string;
  b: number;
  c: boolean;
  s: string;
}

export interface TestDeep {
  a: string;
  b: number;
  deep: Test;
  deepDeep: TestDeep;
}

type Nullable<T> = T | null;

type AllNullable<T> = {};

type AllNullableDeep<T> = {};

// Tip:
type Primitive = string | number | boolean | bigint | symbol | undefined | null;

// Meer geavanceerde DeepNullable (van ts-essentials)
const allNull: DeepNullable<TestDeep> = {} as any;
