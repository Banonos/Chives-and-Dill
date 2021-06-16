import { EngineMessages, ClientMessages } from '@bananos/types';
import { EngineEvents } from '../EngineEvents';
import { EventParser } from '../EventParser';
import { ALL_SPELLS } from '../spells';
import { NewCharacterCreatedEvent, PlayerCastedSpellEvent } from '../types';

export class ProjectileNotifier extends EventParser {
   constructor() {
      super();
      this.eventsToHandlersMap = {
         [EngineEvents.NewCharacterCreated]: this.NewCharacterCreated,
         [EngineEvents.ProjectileCreated]: this.ProjectileCreated,
         [EngineEvents.ProjectileMoved]: this.ProjectileMoved,
         [EngineEvents.ProjectileRemoved]: this.ProjectileRemoved,
      };
   }

   ProjectileMoved = ({ event, services }) => {
      services.socketConnectionService.getIO().sockets.emit(EngineMessages.ProjectileMoved, {
         projectileId: event.projectileId,
         newLocation: event.newLocation,
         angle: event.angle,
      });
   };

   ProjectileCreated = ({ event, services }) => {
      services.socketConnectionService.getIO().sockets.emit(EngineMessages.ProjectileCreated, {
         projectileId: event.projectileId,
         currentLocation: event.currentLocation,
         spell: event.spell,
      });
   };

   ProjectileRemoved = ({ event, services }) => {
      services.socketConnectionService.getIO().sockets.emit(EngineMessages.ProjectileRemoved, {
         projectileId: event.projectileId,
      });
   };

   NewCharacterCreated = ({ event, services }: { event: NewCharacterCreatedEvent; services: any }) => {
      const { newCharacter: currentCharacter } = event.payload;
      const currentSocket = services.socketConnectionService.getSocketById(currentCharacter.socketId);

      currentSocket.on(ClientMessages.PerformBasicAttack, ({ directionLocation, spellName }) => {
         this.engineEventCrator.createEvent({
            type: EngineEvents.PlayerTriesToCastASpell,
            spellData: {
               characterId: currentCharacter.id,
               spell: ALL_SPELLS[spellName],
               directionLocation,
            },
         });
      });
   };
}
