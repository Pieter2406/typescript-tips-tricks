import { Builder } from './demo/auto-builder-pattern';
import { RpgCharacter } from './RpgCharacter';
import { BuilderWithBadInferences } from './demo/anti-examples/BuilderWithBadInference';
import { BuilderWithBadInferences2 } from './demo/anti-examples/BuilderWithBadInference2';
import { healthPotion, glamdring } from './old/rpg';
import { InventoryItem } from './InventoryItem';

// AUTO BUILDER DEMO

const wizardBuilder = new Builder(RpgCharacter, 'Wizard', 'privateinfo');

const gandalf: RpgCharacter = wizardBuilder
  .with('username', 'Gandalf')
  .with('health', 85)
  .with('health', 2)
  .with('int', 4)
  .with('maxHealth', 100)
  .with('inventory', [healthPotion, glamdring])
  .build();

wizardBuilder.with('dex', 78);

console.log(wizardBuilder);
console.log(gandalf);

const inventoryItem = new Builder(InventoryItem, 'InventoryName', 2)
  .with('wielder', gandalf)
  .with('name', 'potion')
  .with('lore', 'Lore of weapon')
  .build();

console.log(inventoryItem);

// Geen typing van constructor
const badBuilder = new BuilderWithBadInferences(RpgCharacter, 'eeaze', 'aeaze');
const badBuilder2 = new BuilderWithBadInferences2(RpgCharacter, 'Warior', '');
// slechte type inferrence
badBuilder2.with('inventory', []);
