import { AssignablePropertiesOf } from '../util-types';

// Een constructor in typescript wordt gezien als een "new" functie.
// Het ConstructorOfType<T> type is een "conditional type".
// Dit is te zien aan de ternaire if-else operator (condition ? true : false)
// Een conditional type hier is een hulpmiddel voor 2 zaken
// 1. Helpt voor typesafety: Het "never" keyword in typescript wil zeggen dat er geen type toe te wijzen is is en wordt
//    tijdens het infereren van alle types "weggeknipt" uit het contract
// 2. Het geeft, in het geval dat T een constructor heeft, T terug als type zodat dit verder kan gebruikt worden door typescript
//    om types te infereren bij het invullen van parameters (zie BuilderWithBadInference.ts)
// Dit 2de punt is dus het antwoord op de vraag: waarom gebruiken we niet gewoon ConstructorType ipv ObjectWithConstructor

type ConstructorType = new (...arg: any) => any;
type ObjectWithConstructor<T> = T extends ConstructorType ? T : never;

export class Builder<T extends ConstructorType> {
  // InstanceType<T> is een ingebouwde functie van typescript die dus net type teruggeeft alsof het een instance zou zijn
  // van een ConstructorType
  private _object: InstanceType<T>;

  // Hier zien we een limitatie van de typescript "magic" (tot waar mijn eigen kennis rijkt tenminste)
  // ConstructorParameters<T> is een ingebouwde TypeScript functie die de argumenten van T gaat "inferren"
  // De "Rest parameter" (de ...args) is in dit geval een array, maar typescript kan dit niet correct "inferren"
  // Daarom zeggen we dat de argumenten een lijst is van any (any[]) zodat we de "spread operator" (...this._baseArgs) kunnen toepassen
  // op de array van argumenten
  private _baseArgs: any[];

  // Typescript trick: private/public in een constructor maakt deze property automatisch toegankelijk in heel de class
  constructor(private entityConstructor: ObjectWithConstructor<T>, ...args: ConstructorParameters<T>) {
    this._baseArgs = args;
    this._object = new entityConstructor(...this._baseArgs);
  }

  // Voor "with" gebruiken we een zelfgedefinieerd type: AssignablePropertiesOf.
  // We gebruiken hier een extra generic "V" voor zodat bij het gebruik van deze functie
  // het type van het "value" argument correct kan inferred worden
  // (Zie BuilderWithBadInferences2.ts voor een voorbeeld hoe het niet moet)
  // Omdat V hier ondubbelzinnig kan inferred worden, is het mogelijk om V te gebruiken om het juiste type van value
  // te inferren. InstanceType<T>[V] betekent hier dus: geef mij het type van de property in T die hoort bij property V.
  //
  // V is in dit geval een element uit (keyof) de lijst van alle "Assignable Properties" (zie util-types) van een instantie van T
  //
  // Tot slot zien we dat het return type van deze functie "this" is. Dit is een typescript ingebouwde functie die
  // automatisch het huidige object inferred en dit dus teruggeeft als type (in dit geval de Builder zelf).
  public with<V extends keyof AssignablePropertiesOf<InstanceType<T>>>(property: V, value: InstanceType<T>[V]): this {
    this._object[property] = value;
    return this;
  }

  // In de build functie, maken we een nieuwe instantie aan door de constructor nogmaals op te roepen, en assignen
  // we alle gezette properties van het intern object aan het nieuwe object om dus een nieuw object terug te geven dat
  // niet gekoppeld is aan deze builder.
  public build(): InstanceType<T> {
    const newObj = new this.entityConstructor(...this._baseArgs);
    Object.assign(newObj, this._object);
    return newObj;
  }

  public snapshot(): Builder<T> {
    const builderSnapshot = new Builder(this.entityConstructor, ...(this._baseArgs as ConstructorParameters<T>));
    const clone = {} as InstanceType<T>;
    Object.assign(clone, this._object);
    builderSnapshot._object = clone;
    return builderSnapshot;
  }
}
