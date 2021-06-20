import { FunctionType } from '../util-types';
// voorbeeld voor Type[V]
type Type1 = {
  a: number;
  b: string;
  f: () => number;
};

const typeVExample: Type1['a'] = {} as any;

// keyof keyword
interface IInterface1 {
  a: string;
  b: number;
}

function keyofExample(t: keyof Type1) {}
keyofExample('a');

type PartOfFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends FunctionType ? K : never };

const test1: PartOfFunctionPropertyNames<Type1> = {} as any;
// never | never | f
// f
