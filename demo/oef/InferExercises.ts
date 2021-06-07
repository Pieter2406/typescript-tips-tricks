import { RpgCharacter } from '../../RpgCharacter';
// Schrijf zelf de functie voor "ConstructorParameters"
// tip constructor type: new (...args:any) => any;
// tip2: "infer" keyword
type ConstructorType = new (...args: any) => any;

// Schrijf zelf de functie voor "InstanceType"
type CustomInstanceType<T extends ConstructorType> = {};

// Schrijf zelf de functie voor "ConstructorParameters"
type ConstructorParamsCustom<T extends ConstructorType> = {};

// De oplossing hiervoor kan je makkelijk terugvinden in de documentatie of door naar de source code van
// InstanceType of ConstructorParamters te gaan kijken (in vscode: ctrl-click op InstanceType of ConstructorParameters uncomment)
// volgende twee lijnen
// const instanceTypeTest: InstanceType<typeof RpgCharacter> = {} as any;
// const paramsTest: ConstructorParamsCustom<typeof RpgCharacter> = {} as any;
