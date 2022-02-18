import { CharacterDirection } from '@bananos/types';
import { EngineEvents } from '../../../EngineEvents';
import { EventParser } from '../../../EventParser';
import type { CharacterDiedEvent, EngineEventHandler, PlayerMovedEvent, PlayerStartedMovementEvent, PlayerStopedAllMovementVectorsEvent } from '../../../types';
import { CharacterType } from '../../../types';
import type { CreateCharacterEvent, ResetCharacterEvent } from '../../CharacterModule/Events';
import { CharacterEngineEvents } from '../../CharacterModule/Events';
import type { CreateNewMonsterEvent, NewMonsterCreatedEvent, MonsterTargetChangedEvent, MonsterLostTargetEvent, MonsterLostAggroEvent } from '../Events';
import { MonsterEngineEvents, MonsterDiedEvent } from '../Events';
import type { Monster } from '../types';

export class MonsterService extends EventParser {
   monsters: Record<string, Monster> = {};
   increment = 0;

   constructor() {
      super();
      this.eventsToHandlersMap = {
         [MonsterEngineEvents.CreateNewMonster]: this.handleCreateNewMonster,
         [MonsterEngineEvents.MonsterTargetChanged]: this.test,
         [MonsterEngineEvents.MonsterLostTarget]: this.test2,
         [MonsterEngineEvents.MonsterLostAggro]: this.handleMonsterLostAggro,
         [EngineEvents.CharacterDied]: this.handleCharacterDied,
         [EngineEvents.PlayerMoved]: this.handlePlayerMoved,
         [EngineEvents.PlayerStartedMovement]: this.handlePlayerStartedMovement,
         [EngineEvents.PlayerStopedAllMovementVectors]: this.handlePlayerStopedAllMovementVectors,
      };
   }

   handleCharacterDied: EngineEventHandler<CharacterDiedEvent> = ({ event }) => {
      delete this.monsters[event.characterId];
   };

   handlePlayerStartedMovement: EngineEventHandler<PlayerStartedMovementEvent> = ({ event }) => {
      if (this.monsters[event.characterId]) {
         this.monsters[event.characterId].isInMove = true;
      }
   };

   handlePlayerStopedAllMovementVectors: EngineEventHandler<PlayerStopedAllMovementVectorsEvent> = ({ event }) => {
      if (this.monsters[event.characterId]) {
         this.monsters[event.characterId].isInMove = false;
      }
   };

   test: EngineEventHandler<MonsterTargetChangedEvent> = ({ event }) => {
      console.log('targetChanged:', event.newTargetId);
   };
   test2: EngineEventHandler<MonsterLostTargetEvent> = ({ event }) => {
      console.log('targetLost:', event.targetId);
   };

   handlePlayerMoved: EngineEventHandler<PlayerMovedEvent> = ({ event }) => {
      if (this.monsters[event.characterId]) {
         this.monsters[event.characterId].location = event.newLocation;
         this.monsters[event.characterId].direction = event.newCharacterDirection;
      }
   };

   handleCreateNewMonster: EngineEventHandler<CreateNewMonsterEvent> = ({ event }) => {
      const id = `monster_${(this.increment++).toString()}`;
      this.monsters[id] = {
         type: CharacterType.Monster,
         id,
         name: event.monsterRespawn.monsterTemplate.name,
         location: event.monsterRespawn.location,
         sprites: event.monsterRespawn.monsterTemplate.sprites,
         avatar: event.monsterRespawn.monsterTemplate.avatar,
         size: event.monsterRespawn.monsterTemplate.size,
         direction: CharacterDirection.DOWN,
         division: event.monsterRespawn.monsterTemplate.division,
         isInMove: false,
         respawnId: event.monsterRespawn.id,
         sightRange: event.monsterRespawn.monsterTemplate.sightRange,
         speed: event.monsterRespawn.monsterTemplate.speed,
         desiredRange: event.monsterRespawn.monsterTemplate.desiredRange,
         escapeRange: event.monsterRespawn.monsterTemplate.escapeRange,
         spells: event.monsterRespawn.monsterTemplate.spells,
         attackFrequency: event.monsterRespawn.monsterTemplate.attackFrequency,
         healthPointsRegen: event.monsterRespawn.monsterTemplate.healthPointsRegen,
         spellPowerRegen: event.monsterRespawn.monsterTemplate.spellPowerRegen,
      };
      console.log('new monster created');

      this.engineEventCrator.asyncCeateEvent<CreateCharacterEvent>({
         type: CharacterEngineEvents.CreateCharacter,
         character: this.monsters[id],
      });

      this.engineEventCrator.asyncCeateEvent<NewMonsterCreatedEvent>({
         type: MonsterEngineEvents.NewMonsterCreated,
         monster: this.monsters[id],
      });
   };

   handleMonsterLostAggro: EngineEventHandler<MonsterLostAggroEvent> = ({ event }) => {
      if (this.monsters[event.monsterId]) {
         this.engineEventCrator.asyncCeateEvent<ResetCharacterEvent>({
            type: CharacterEngineEvents.ResetCharacter,
            characterId: event.monsterId,
         });
      }
   };

   CharacterDied: EngineEventHandler<CharacterDiedEvent> = ({ event }) => {
      delete this.monsters[event.characterId];
   };

   getAllCharacters = () => this.monsters;
}
