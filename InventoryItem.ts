import { RpgCharacter } from './RpgCharacter';
export class InventoryItem {
  public weight: number = 0;
  public name: string = '';
  public lore: string = '';
  public wielder?: RpgCharacter;

  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }

  public destroy(): void {
    //
  }
}
