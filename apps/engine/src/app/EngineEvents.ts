export enum EngineEvents {
   CreateNewPlayer = 'CreateNewPlayer',
   NewPlayerCreated = 'NewPlayerCreated',
   PlayerDisconnected = 'PlayerDisconnected',
   PlayerStartedMovement = 'PlayerStartedMovement',
   PlayerStopedMovementVector = 'PlayerStopedMovementVector',
   PlayerStopedAllMovementVectors = 'PlayerStopedAllMovementVectors',
   PlayerMoved = 'PlayerMoved',
   PlayerTriesToStartedMovement = 'PlayerTriesToStartedMovement',

   CharacterLostHp = 'CharacterLostHp',
   CharacterGotHp = 'CharacterGotHp',
   CharacterLostSpellPower = 'CharacterLostSpellPower',
   CharacterGotSpellPower = 'CharacterGotSpellPower',
   CharacterDied = 'CharacterDied',
   TakeCharacterHealthPoints = 'TakeCharacterHealthPoints',
   AddCharacterHealthPoints = 'AddCharacterHealthPoints',
   TakeCharacterSpellPower = 'TakeCharacterSpellPower',
   AddCharacterSpellPower = 'AddCharacterSpellPower',

   CreatePath = 'CreatePath',
   UpdatePath = 'UpdatePath',
   DeletePath = 'DeletePath',
   ScheduleAction = 'ScheduleAction',
   CancelScheduledAction = 'CancelScheduledAction',
   ScheduleActionTriggered = 'ScheduleActionTriggered',
   ScheduleActionFinished = 'ScheduleActionFinished',
}
