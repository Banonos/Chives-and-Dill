import type { QuestsState } from '../../types/quests';
import type { QuestAction } from './actions';
import { QuestsActionTypes } from './actions';
import _ from 'lodash';

const initialState: QuestsState = {
  quests: {},
};

export const questsReducer = (
  state: QuestsState = initialState,
  action: QuestAction
): QuestsState => {
  switch (action.type) {
    case QuestsActionTypes.QUEST_STARTED:
      return {
        ...state,
        quests: {
          ...state.quests,
          [action.payload.questTemplate.id]: action.payload.questTemplate,
        },
      }
      case QuestsActionTypes.QUEST_COMPLETED: 
        return {
          ...state,
          quests: _.omit(state.quests, action.payload.questId),
        };
      case QuestsActionTypes.NEW_QUEST_STAGE_STARTED:
        return {
          ...state,
          quests: {
            ...state.quests,
            [action.payload.questId]: {
              ...state.quests[action.payload.questId],
              questStage: action.payload.questStage
            }
          },
      };
      case QuestsActionTypes.KILLING_STAGE_PART_PROGRESS:
        return {
          ...state,
          quests: {
            ...state.quests,
            [action.payload.questId]: {
              ...state.quests[action.payload.questId],
              questStage: {
                ...state.quests[action.payload.questId].questStage,
                stageParts:{
                  ...state.quests[action.payload.questId].questStage.stageParts,
                  [action.payload.stagePartId]: {
                    ...state.quests[action.payload.questId].questStage.stageParts[action.payload.stagePartId],
                    currentProgress: action.payload.currentProgress
                  }
                }
              }
            }
          },
      };
    default:
      return state;
  }
};
