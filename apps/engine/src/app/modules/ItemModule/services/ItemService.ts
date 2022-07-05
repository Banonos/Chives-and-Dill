import { EventParser } from '../../../EventParser';
import { EngineEventHandler } from '../../../types';
import { AddItemToCharacterEvent, GenerateItemForCharacterEvent, ItemDeletedEvent, ItemEngineEvents, PlayerTriesToDeleteItemEvent } from '../Events';

export class ItemService extends EventParser {
   private items: Record<string, { itemId: string; ownerId: string }> = {};
   private increment = 0;

   constructor() {
      super();
      this.eventsToHandlersMap = {
         [ItemEngineEvents.GenerateItemForCharacter]: this.handleGenerateItemForCharacter,
         [ItemEngineEvents.PlayerTriesToDeleteItem]: this.handlePlayerTriesToDeleteItem,
      };
   }

   handleGenerateItemForCharacter: EngineEventHandler<GenerateItemForCharacterEvent> = ({ event }) => {
      const itemId = `ItemInstance_${this.increment++}`;
      this.items[itemId] = { itemId, ownerId: event.characterId };

      this.engineEventCrator.asyncCeateEvent<AddItemToCharacterEvent>({
         type: ItemEngineEvents.AddItemToCharacter,
         characterId: event.characterId,
         amount: event.amount,
         itemId,
      });
   };

   handlePlayerTriesToDeleteItem: EngineEventHandler<PlayerTriesToDeleteItemEvent> = ({ event }) => {
      if (!this.items[event.itemId] || this.items[event.itemId].ownerId !== event.requestingCharacterId) {
         this.sendErrorMessage(event.requestingCharacterId, 'Item does not exist.');
         return;
      }

      delete this.items[event.itemId];

      this.engineEventCrator.asyncCeateEvent<ItemDeletedEvent>({
         type: ItemEngineEvents.ItemDeleted,
         lastCharacterOwnerId: event.requestingCharacterId,
         itemId: event.itemId,
      });
   };
}
