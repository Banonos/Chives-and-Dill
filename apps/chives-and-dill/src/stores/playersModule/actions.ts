import type { FSAAuto } from 'flux-standard-action';
import type {
  ChangeLocationPayload,
  InitializePlayersPayload,
  AddPlayerPayload,
  DeletePlayerPayload,
  ChangePlayerMovingStatusPayload,
  UpdateCharacterHpPayload,
  UpdateCharacterSpellPowerPayload,
  CharacterDiedPayload,
} from '../../types/players';

export enum PlayersActionTypes {
  INITIALIZE_PLAYERS = '[Players] INITIALIZE_PLAYERS',
  CHANGE_PLAYER_POSITION = '[Players] CHANGE_PLAYER_POSITION',
  ADD_PLAYER = '[Players] ADD_PLAYER',
  DELETE_PLAYER = '[Players] DELETE_PLAYER',
  CHANGE_PLAYER_MOVING_STATUS = '[Players] CHANGE_PLAYER_MOVING_STATUS',
  UPDATE_CHARACTER_HP = '[Players] UPDATE_CHARACTERS_HP',
  UPDATE_CHARACTER_SPELL_POWER = '[Players] UPDATE_CHARACTERS_SPELL_POWER',
  CHARACTER_DIED = '[Players] CHARACTER_DIED',
  QUEST_STARTED = '[Players] QUEST_STARTED',
  QUEST_COMPLETED = '[Players] QUEST_COMPLETED',
  KILLING_STAGE_PART_PROGRESS = '[Players] KILLING_STAGE_PART_PROGRESS',
  NEW_QUEST_STAGE_STARTED = '[QUESTS] NEW_QUEST_STAGE_STARTED',
}

export type ChangePlayerPosition = FSAAuto<
  PlayersActionTypes.CHANGE_PLAYER_POSITION,
  ChangeLocationPayload
>;

export type InitializePlayers = FSAAuto<
  PlayersActionTypes.INITIALIZE_PLAYERS,
  InitializePlayersPayload
>;

export type AddPlayer = FSAAuto<
  PlayersActionTypes.ADD_PLAYER,
  AddPlayerPayload
>;

export type DeletePlayer = FSAAuto<
  PlayersActionTypes.DELETE_PLAYER,
  DeletePlayerPayload
>;

export type UpdateCharacterHp = FSAAuto<
  PlayersActionTypes.UPDATE_CHARACTER_HP,
  UpdateCharacterHpPayload
>;

export type UpdateCharacterSpellPower = FSAAuto<
  PlayersActionTypes.UPDATE_CHARACTER_SPELL_POWER,
  UpdateCharacterSpellPowerPayload
>;

export type CharacterDied = FSAAuto<
  PlayersActionTypes.CHARACTER_DIED,
  CharacterDiedPayload
>;

export type ChangePlayerMovingStatus = FSAAuto<
  PlayersActionTypes.CHANGE_PLAYER_MOVING_STATUS,
  ChangePlayerMovingStatusPayload
>;

export const changePlayerPosition = (
  payload: ChangeLocationPayload
): ChangePlayerPosition => ({
  type: PlayersActionTypes.CHANGE_PLAYER_POSITION,
  payload,
});

export const changePlayerMovingStatus = (
  payload: ChangePlayerMovingStatusPayload
): ChangePlayerMovingStatus => ({
  type: PlayersActionTypes.CHANGE_PLAYER_MOVING_STATUS,
  payload,
});

export const initializePlayers = (
  payload: InitializePlayersPayload
): InitializePlayers => ({
  type: PlayersActionTypes.INITIALIZE_PLAYERS,
  payload,
});

export const addPlayer = (payload: AddPlayerPayload): AddPlayer => ({
  type: PlayersActionTypes.ADD_PLAYER,
  payload,
});

export const deletePlayer = (payload: DeletePlayerPayload): DeletePlayer => ({
  type: PlayersActionTypes.DELETE_PLAYER,
  payload,
});

export const updateCharacterHp = (payload: UpdateCharacterHpPayload): UpdateCharacterHp => ({
  type: PlayersActionTypes.UPDATE_CHARACTER_HP,
  payload,
});

export const updateCharacterSpellPower = (payload: UpdateCharacterSpellPowerPayload): UpdateCharacterSpellPower => ({
  type: PlayersActionTypes.UPDATE_CHARACTER_SPELL_POWER,
  payload,
});

export const characterDied = (payload: CharacterDiedPayload): CharacterDied => ({
  type: PlayersActionTypes.CHARACTER_DIED,
  payload,
});

export type PlayerAction =
  | ChangePlayerPosition
  | InitializePlayers
  | AddPlayer
  | DeletePlayer
  | ChangePlayerMovingStatus
  | UpdateCharacterHp
  | UpdateCharacterSpellPower
  | CharacterDied;
