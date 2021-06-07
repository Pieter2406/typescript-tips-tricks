import { Builder } from './auto-builder-pattern';
import { RpgCharacter } from '../RpgCharacter';
import { healthPotion, glamdring } from '../old/rpg';

// AUTO BUILDER DEMO

// 1. Dwarf Warior Builder
const dwarfWariorBuilder = new Builder(RpgCharacter, 'Warior', 'Dwarves like beer').with('race', 'Dwarf');

const Gimli = dwarfWariorBuilder
  .snapshot()
  .with('maxHealth', 255)
  .with('username', 'gim')
  .with('str', 18)
  .with('int', 4)
  .with('inventory', [healthPotion, glamdring])
  .build();

const htmlElementBuilder = new Builder(HTMLElement).with('innerHTML', 'value').build();
