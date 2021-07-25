import { AreaType, SpellEffectType, SpellType } from './SpellType';
import type { Spell } from './types/Spell';

export const ALL_SPELLS: Record<string, Spell> = {
   test: {
      type: SpellType.AngleBlast,
      name: 'test',
      range: 4000,
      areaType: AreaType.Circle,
      spellPowerCost: 10,
      cooldown: 500,

      // Cone
      angle: Math.PI * 2,

      // Area
      radius: 50,

      // Projectile
      speed: 15,

      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 40 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 10,
         },
      ],
      spellEffectsOnDirectionLocation: [
         // {
         //    type: SpellEffectType.Area,
         //    areaType: AreaType.Circle,
         //    radius: 2000,
         //    period: 10000 * 10,
         //    attackFrequency: 1000,
         //    spellEffects: [
         //       {
         //          type: SpellEffectType.Damage,
         //          amount: 1,
         //       },
         //    ],
         // },
      ],
      spellEffectsOnCasterOnSpellHit: [
         {
            type: SpellEffectType.Heal,
            amount: 50,
         },
      ],
   },
   DirectHit: {
      type: SpellType.DirectInstant,
      name: 'DirectHit',
      range: 400,
      spellPowerCost: 10,
      cooldown: 1000,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 25 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 10,
         },
      ],
      spellEffectsOnDirectionLocation: [
         {
            type: SpellEffectType.Area,
            areaType: AreaType.Circle,
            radius: 200,
            period: 1000 * 10,
            attackFrequency: 200,
            spellEffects: [
               {
                  type: SpellEffectType.Damage,
                  amount: 1,
               },
            ],
         },
      ],
      spellEffectsOnCasterOnSpellHit: [],
   },
   Projectile: {
      type: SpellType.Projectile,
      name: 'Projectile',
      range: 4000,
      spellPowerCost: 10,
      speed: 4,
      cooldown: 5000,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 40 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Heal,
            amount: 35,
         },
      ],
      spellEffectsOnDirectionLocation: [],
      spellEffectsOnCasterOnSpellHit: [],
   },
   MonsterProjectile: {
      type: SpellType.Projectile,
      name: 'MonsterProjectile',
      range: 1000,
      spellPowerCost: 10,
      speed: 40,
      cooldown: 2000,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 20 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 10,
         },
      ],
      spellEffectsOnDirectionLocation: [],
      spellEffectsOnCasterOnSpellHit: [],
   },
   MonsterInstant1: {
      type: SpellType.DirectInstant,
      name: 'MonsterInstant1',
      range: 500,
      spellPowerCost: 10,
      cooldown: 1000,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 15 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 10,
         },
      ],
      spellEffectsOnDirectionLocation: [],
      spellEffectsOnCasterOnSpellHit: [],
   },
   MonsterInstant2: {
      type: SpellType.DirectInstant,
      name: 'MonsterInstant2',
      range: 1500,
      spellPowerCost: 10,
      cooldown: 1000,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 40 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 5,
         },
      ],
      spellEffectsOnDirectionLocation: [],
      spellEffectsOnCasterOnSpellHit: [],
   },
   InstantProjectile: {
      type: SpellType.Projectile,
      name: 'InstantProjectile',
      range: 1000,
      spellPowerCost: 10,
      speed: 1000,
      cooldown: 0,
      image: "../assets/spritesheets/spells/mage/fireball.jpg",
      description: "Inflicts 69 Fire damage to an enemy and causes them to burn for 8 sec.",
      spellEffectsOnTarget: [
         {
            type: SpellEffectType.Damage,
            amount: 100,
         },
      ],
      spellEffectsOnDirectionLocation: [],
      spellEffectsOnCasterOnSpellHit: [],
   },
};
