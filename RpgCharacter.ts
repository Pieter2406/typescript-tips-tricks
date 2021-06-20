import { InventoryItem } from './inventory-types';
type CharacterType = 'Wizard' | 'Warior' | 'Warlock' | 'Barbarian';
type Race = 'Dwarf' | 'Human' | 'Elf';
export class RpgCharacter {
  username: string = '';
  health: number = 0;
  maxHealth: number = 0;
  str: number = 0;
  dex: number = 0;
  con: number = 0;
  wis: number = 0;
  int: number = 0;
  cha: number = 0;
  race: Race = 'Elf';
  inventory: InventoryItem[] = [];

  constructor(private characterType: CharacterType, private privateInfo: string) {}

  public heal(amount: number) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
}
