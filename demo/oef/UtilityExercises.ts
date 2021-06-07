// Schrijf zelf een Pick en een Omit functie
// Zie de typescript docs voor uitleg https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys

import { TestDeep } from './AllNullableDeep';

type CustomPick<Type, Keys extends keyof Type> = {};

type CustomOmit<Type, Keys extends keyof Type> = {};

const test: CustomPick<TestDeep, 'a' | 'deep'> = {} as any;
const test2: CustomOmit<TestDeep, 'deep'> = {} as any;
