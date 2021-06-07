import { Primitive } from 'ts-essentials';
import { TestDeep } from '../AllNullableDeep';

// Oplossing
type AllNullableDeepSol<T> = { [K in keyof T]: T[K] extends Primitive ? T[K] | null : AllNullableDeepSol<T[K]> };

const deepSol: AllNullableDeepSol<TestDeep> = {} as any;
