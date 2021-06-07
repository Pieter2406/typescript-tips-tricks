// Library with helper functions for typescript
import { OmitProperties, Primitive, WritableKeys } from 'ts-essentials';
import { RpgCharacter } from './RpgCharacter';

type PrimitiveType = string | boolean | number;
export type PrimitiveObject = { [key: string]: PrimitiveType | PrimitiveType[] };

export type KeysOfType<T, U> = Exclude<
  {
    [P in keyof T]: T[P] extends U ? P : never;
  }[keyof T],
  undefined
>;

export type PrimitiveKeysOf<T> = KeysOfType<T, PrimitiveType>;

type FunctionPropertiesOf<T> = { [K in keyof T]: T[K] extends (args: any) => any ? K : never }[keyof T];

// Zie Hieronder voor een uitleg over Pick
// WriteableKeys is ook een ts-essentials functie en gaat dus een union-type teruggeven van alle keys (namen van properties)
// van een class/interface/type T die "schrijfbaar" zijn (en dus niet readonly of private)
// De details van dit type gaan buiten de scope van deze talk, maar in essentie is dit volledig op te bouwen
// uit ingebouwde functies, zonder extra "hackyness".
type WriteablePropertiesOf<T> = Pick<T, WritableKeys<T>>;

type FilterOutFunctionPropertiesOf<T> = Omit<T, FunctionPropertiesOf<T>>;

// AssignablePropertiesOf wordt gedefinieerd in termen van andere types
// Doordat we types kunnen definieren in functie van andere types, kunnen we complexe maar toch duidelijke
// Types opbouwen.
//
// In dit geval filteren we eerst op "WritableProperties"
// Dit zijn properties die kunnen overschreven worden en dus niet readonly of private gedefinieerd zijn.
// Daarna gebruiken we de ingebouwde Omit type die in dit geval alle  properties uit filtered van het type "(args:any) => any" (functies dus)
export type AssignablePropertiesOf<T> = WriteablePropertiesOf<FilterOutFunctionPropertiesOf<T>>;

// OmitProperties uit ts-essentials is gedefineerd als hieronder.
// Hier wordt de ingebouwde Pick functie van typescript gebruikt om specifieke keys (properties) uit het type T te selecteren
// De keys die geselecteerd worden zijn al de keys die P NIET extenden (en dus niet te assignen zijn aan het type P)
// de structuur {...}[...] wordt in typescript vertaald naar een "union" van types. deze "union" wordt dan gebruikt om
// properties uit T te "plukken".
// We zien hier ook "never" terugkomen.
// Letterlijk staat er: als het type van property K assignable is aan P geef dan het "never"-type terug, anders laat dit gewoon K zijn
// "never"-types worden automatisch weggesnoeid bij bvb autocompletion en is dus niet zichtbaar
type CustomOmitProperties<T, P> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends P ? never : K;
  }[keyof T]
>;

// Voorbeelden
interface Test {
  a: string;
  b: number;
  c: boolean;
  s: string;
}

type AllNullable<T> = { [K in keyof T]: T[K] | null };

const allnullTest: AllNullable<Test> = {} as any;

type PropertiesNotExtendingType<T, P> = {
  [K in keyof T]: T[K] extends P ? never : K;
}[keyof T];

// In dit voorbeeld selecteren we alle properties die geen string of booleans zijn
const propName: PropertiesNotExtendingType<Test, string | boolean> = {} as any;
// propName is in dit voorbeeld dus "b"
propName;
const t: Pick<Test, PropertiesNotExtendingType<Test, string>> = {} as any;

// Meer exotisch

// Het "min"-teken verwijderd een bepaalde eigenschap van een property.
// In dit geval wordt alles "required" omdat "?" (het optional teken) wordt weggehaald
type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface ITestWithOptionals {
  optional1?: string;
  required1: number;
  optional2?: string;
  required2: number;
}

const req: Required<ITestWithOptionals> = {} as any;

type NotReadOnly<T> = {
  -readonly [P in keyof T]: T[P];
};

interface ITestWithReadOnly {
  readonly ro: string;
  notRo: string;
}

const testWithReadonlyGone: NotReadOnly<ITestWithReadOnly> = {} as any;
const testWithReadonly: ITestWithReadOnly = {} as any;
testWithReadonlyGone.ro = 'test';
// testWithReadonly.ro = "can't"

type Lang = 'en' | 'nl' | 'jp';
type Doc = 'text' | 'ppt' | 'video';
type LangDoc = `${Doc}_${Lang}`;
const langDoc: LangDoc = 'ppt_jp';

type EventType = 'Updated' | 'Deleted' | 'Created';
type RpgCharacterEvent = `${keyof AssignablePropertiesOf<RpgCharacter>}${EventType}Event`;

function on(event: RpgCharacterEvent) {
  switch (event) {
    case 'healthCreatedEvent':
      return;
    case 'healthDeletedEvent':
      return;
    case 'inventoryDeletedEvent':
      return;
  }
}
