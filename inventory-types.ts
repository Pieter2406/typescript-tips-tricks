import { PrimitiveObject } from './util-types';
import { RpgCharacter } from './RpgCharacter';
import { XOR } from 'ts-essentials';

// Effects are function which take an RpgCharacter, and modifies the RPG character based on the effect implementation
type Effect = (IRpgCharacter: RpgCharacter) => void;

type WithLore = { lore: string };
type WithCreator = { creator: RpgCharacter };
type WithWeight = { weight: number };
type WithName = { name: string };

interface IInventoryItem<MetaData = any> extends WithWeight, WithName, WithCreator, WithLore {
  metaData?: MetaData;
}

const t2: IInventoryItem = {
  creator: new RpgCharacter('Barbarian', 'privateInfo'),
  name: 'name',
  lore: 'lore',
  weight: 9001,
};

type IInventoryItem2 = WithLore & WithCreator & WithWeight & WithName;
const t3: IInventoryItem2 = {
  creator: new RpgCharacter('Barbarian', 'privateInfo'),
  name: 'name',
  lore: 'lore',
  weight: 9001,
};

type SpecialInventoryItem = (WithLore & WithWeight) | (WithCreator & WithName);
const t4: SpecialInventoryItem = {
  creator: new RpgCharacter('Barbarian', 'privateInfo'),
  name: 'name',
  lore: 'lore',
  weight: 9001,
};

const VerySpecialInventoryItem: XOR<WithLore & WithWeight, WithCreator & WithName> = {
  // creator: new RpgCharacter('Barbarian', 'privateInfo'),
  // name: 'name',
  lore: 'lore',
  weight: 9001,
};

interface IInventoryItemMetaData extends PrimitiveObject {
  lore: string;
}

interface IWeaponMetaData extends IInventoryItemMetaData {
  forgedBy: string;
}

interface IPotionMetaData extends IInventoryItemMetaData {
  brewnBy: string;
}

export interface IWeapon extends IInventoryItem<IWeaponMetaData> {
  atk: number;
}

export interface IPotion extends IInventoryItem<IPotionMetaData> {
  effect: Effect;
  duration: number;
}

export type InventoryItem = IWeapon | IPotion;
