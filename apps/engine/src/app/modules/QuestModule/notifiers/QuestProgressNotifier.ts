import { AllExternalQuestStageProgress, ExternalQuestProgress, GlobalStoreModule, QuestType } from '@bananos/types';
import * as _ from 'lodash';
import { Notifier } from '../../../Notifier';
import { CharacterType, EngineEventHandler } from '../../../types';
import {
   AllQuestStagesCompletedEvent,
   KillingStagePartProgressEvent,
   NewQuestStageStartedEvent,
   QuestEngineEvents,
   QuestStartedEvent,
   StagePartCompletedEvent,
} from '../Events';

export class QuestProgressNotifier extends Notifier<ExternalQuestProgress> {
   constructor() {
      super({ key: GlobalStoreModule.QUEST_PROGRESS });
      this.eventsToHandlersMap = {
         [QuestEngineEvents.NewQuestStageStarted]: this.handleNewQuestStageStarted,
         [QuestEngineEvents.KillingStagePartProgress]: this.handleKillingStagePartProgress,
         [QuestEngineEvents.StagePartCompleted]: this.handleStagePartCompleted,
         [QuestEngineEvents.QuestStarted]: this.handleQuestStarted,
         [QuestEngineEvents.AllQuestStagesCompleted]: this.handleAllQuestStagesCompleted,
         //  [QuestEngineEvents.QuestCompleted]: this.handleQuestCompleted,
      };
   }

   stageInitialTranformers: Record<QuestType, () => AllExternalQuestStageProgress> = {
      [QuestType.MOVEMENT]: () => ({ type: QuestType.MOVEMENT, isDone: false }),
      [QuestType.KILLING]: () => ({ type: QuestType.KILLING, isDone: false, currentAmount: 0 }),
   };

   handleQuestStarted: EngineEventHandler<QuestStartedEvent> = ({ event, services }) => {
      const character = services.characterService.getCharacterById(event.characterId);
      if (character.type != CharacterType.Player) {
         return;
      }

      this.multicastMultipleObjectsUpdate([
         {
            receiverId: character.ownerId,
            objects: {
               [event.questTemplate.id]: {
                  allStagesCompleted: false,
               },
            },
         },
      ]);
   };

   handleNewQuestStageStarted: EngineEventHandler<NewQuestStageStartedEvent> = ({ event, services }) => {
      const character = services.characterService.getCharacterById(event.characterId);
      if (character.type != CharacterType.Player) {
         return;
      }

      this.multicastMultipleObjectsUpdate([
         {
            receiverId: character.ownerId,
            objects: {
               [event.questId]: {
                  activeStage: event.questStage.id,
                  stagesProgress: {
                     [event.questStage.id]: _.mapValues(event.questStage.stageParts, (stagePart) => this.stageInitialTranformers[stagePart.type]()),
                  },
               },
            },
         },
      ]);
   };

   handleKillingStagePartProgress: EngineEventHandler<KillingStagePartProgressEvent> = ({ event, services }) => {
      const character = services.characterService.getCharacterById(event.characterId);
      if (character.type != CharacterType.Player) {
         return;
      }

      this.multicastMultipleObjectsUpdate([
         {
            receiverId: character.ownerId,
            objects: {
               [event.questId]: {
                  stagesProgress: { [event.stageId]: { [event.stagePartId]: { currentAmount: event.currentProgress } } },
               },
            },
         },
      ]);
   };

   handleStagePartCompleted: EngineEventHandler<StagePartCompletedEvent> = ({ event, services }) => {
      const character = services.characterService.getCharacterById(event.characterId);
      if (character.type != CharacterType.Player) {
         return;
      }

      this.multicastMultipleObjectsUpdate([
         {
            receiverId: character.ownerId,
            objects: {
               [event.questId]: {
                  stagesProgress: { [event.stageId]: { [event.stagePartId]: { isDone: true } } },
               },
            },
         },
      ]);
   };

   handleAllQuestStagesCompleted: EngineEventHandler<AllQuestStagesCompletedEvent> = ({ event, services }) => {
      const character = services.characterService.getCharacterById(event.characterId);
      if (character.type != CharacterType.Player) {
         return;
      }

      this.multicastMultipleObjectsUpdate([
         {
            receiverId: character.ownerId,
            objects: {
               [event.questId]: {
                  allStagesCompleted: true,
               },
            },
         },
      ]);
   };

   //    handleQuestCompleted: EngineEventHandler<StagePartCompletedEvent> = ({ event, services }) => {
   //       const character = services.characterService.getCharacterById(event.characterId);
   //       if (character.type != CharacterType.Player) {
   //          return;
   //       }

   //       this.multicastMultipleObjectsUpdate([
   //          {
   //             receiverId: character.ownerId,
   //             objects: {
   //                [event.questId]: {},
   //             },
   //          },
   //       ]);
   //    };
}
