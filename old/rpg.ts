import { IWeapon, IPotion } from '../inventory-types';
import { RpgCharacter } from '../RpgCharacter';
// export const gandalf: IRpgCharacter = {} as any;
export const glamdring: IWeapon = {
  atk: 9001,
  name: 'Glamdring',
  weight: 3,
  lore: '',
  creator: {} as RpgCharacter,
  metaData: {
    attackBonusses: [5],
    lore:
      'Glamdring (also called the Foe-hammer and the Beater) was a hand-and-a-half sword, forged for Turgon, the Elven King of Gondolin during the First Age, and much later owned by the wizard Gandalf.',
    forgedBy: 'Turgon, the Elven King of Gondolin',
  },
};

export const healthPotion: IPotion = {
  duration: 30,
  effect: (rpgCharacter) => {
    rpgCharacter.health = Math.min(rpgCharacter.maxHealth, rpgCharacter.health + 10);
    return rpgCharacter;
  },
  name: 'Health Potion',
  lore: '',
  creator: {} as RpgCharacter,
  weight: 0.5,
  metaData: {
    brewnBy: 'Pieter',
    lore: 'A basic health potion. Nothing fancy',
  },
};

// gandalf.inventory.push(glamdring);
// gandalf.inventory.push(healthPotion);
