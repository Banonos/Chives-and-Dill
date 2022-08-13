import { CorpseDropTrack } from '@bananos/types';
import { EngineEvents } from '../../../EngineEvents';
import { EventParser } from '../../../EventParser';
import { CharacterDiedEvent, EngineEventHandler } from '../../../types';
import { CharacterEngineEvents, CorpseDropTrackCreatedEvent } from '../Events';

export class CorpseDropService extends EventParser {
   // deadCharacterId => itemId (incrementId)
   private corpsesDropTrack: Record<string, CorpseDropTrack> = {};
   private increment = 0;

   constructor() {
      super();
      this.eventsToHandlersMap = {
         [EngineEvents.CharacterDied]: this.handleCharacterDied,
      };
   }

   handleCharacterDied: EngineEventHandler<CharacterDiedEvent> = ({ event, services }) => {
      const monster = services.monsterService.getAllCharacters()[event.characterId];
      const monsterRespawns = services.monsterRespawnTemplateService.getData();

      if (monster) {
         const characterTemplate = monsterRespawns[monster.respawnId].characterTemplate;
         const itemsToDrop = {};

         characterTemplate.dropSchema
            ?.filter((dropItem) => dropItem.dropChance >= services.randomGeneratorService.generateNumber())
            .forEach((dropItem) => {
               this.increment++;
               const amountRange = dropItem.maxAmount - dropItem.minAmount;
               itemsToDrop[this.increment] = {
                  amount: dropItem.minAmount + Math.round(amountRange * services.randomGeneratorService.generateNumber()),
                  item: dropItem.item,
               };
            });

         if (Object.keys(itemsToDrop).length) {
            this.corpsesDropTrack[event.characterId] = itemsToDrop;

            this.engineEventCrator.asyncCeateEvent<CorpseDropTrackCreatedEvent>({
               type: CharacterEngineEvents.CorpseDropTrackCreated,
               characterId: event.characterId,
            });
         }
      }
   };

   getCorpseDropTrackById = (id: string) => this.corpsesDropTrack[id];
}
