import { PathFinderEngine } from '../engines';
import type {
   AngleBlastSpellService,
   AreaSpellService,
   AreaTimeEffectNotifier,
   DamageEffectService,
   DirectInstantSpellService,
   HealEffectService,
   KillingQuestService,
   ManaService,
   MovementQuestService,
   ProjectileNotifier,
   ProjectilesService,
   QuestNotifier,
   QuestProgressService,
   SpellAvailabilityService,
   SpellEffectApplierService,
   SpellNotifier,
   TeleportationSpellService,
} from '../modules';
import { PowerPointsService } from '../modules/CharacterModule';
import { ActiveCharacterNotifier, AreaNotifier, CharacterNotifier, PowerPointsNotifier } from '../modules/CharacterModule/notifiers';
import type { RegenerationService } from '../modules/CharacterModule/services/RegenerationService';
import type { BossFightService, MonsterAttackService, MonsterMovementService, MonsterService, RespawnService } from '../modules/MonsterModule';
import type { MonsterNotifier } from '../modules/MonsterModule/notifiers/MonsterNotifier';
import type { AggroService } from '../modules/MonsterModule/services/aggroService';
import type { PlayerMovementService } from '../modules/PlayerModule';
import type { PlayerMovementNotifier, CharacterEffectNotifier } from '../modules/PlayerModule/notifiers';
import { PlayerNotifier } from '../modules/PlayerModule/notifiers/PlayerNotifier';
import type { CharactersService } from '../modules/CharacterModule/services/CharactersService';
import { PlayerService } from '../modules/PlayerModule/services/PlayerService';
import { AbsorbShieldNotifier } from '../modules/SpellModule/notifiers/ABsorbShieldNotifier';
import { ChannelingNotifier } from '../modules/SpellModule/notifiers/ChannelingNotifier';
import { SpellPowerNotifier } from '../modules/SpellModule/notifiers/SpellPowerNotifier';
import { TimeEffectNotifier } from '../modules/SpellModule/notifiers/TimeEffectNotifier';
import type { CooldownService } from '../modules/SpellModule/services/CooldownService';
import type { AbsorbShieldEffectService } from '../modules/SpellModule/services/EffectHandlers/AbsorbShieldEffectService';
import type { AreaEffectService } from '../modules/SpellModule/services/EffectHandlers/AreaEffectService';
import type { GenerateSpellPowerEffectService } from '../modules/SpellModule/services/EffectHandlers/GenerateSpellPowerEffectService';
import type { PowerStackEffectService } from '../modules/SpellModule/services/EffectHandlers/PowerStackEffectService';
import type { TickEffectOverTimeService } from '../modules/SpellModule/services/EffectHandlers/TickEffectOverTimeService';
import type { ChannelService } from '../modules/SpellModule/services/SpellHandlers/ChannelService';
import type { GuidedProjectilesService } from '../modules/SpellModule/services/SpellHandlers/GuidedProjectilesService';
import type { PathFinderService, SocketConnectionService } from '../services';
import type { SchedulerService } from '../services/SchedulerService';
import { PlayerCharacterService } from '../modules/PlayerModule/services/PlayerCharacterService';

export interface Services {
   pathFinderService: PathFinderService;
   schedulerService: SchedulerService;
   characterService: CharactersService;
   playerMovementService: PlayerMovementService;
   projectilesService: ProjectilesService;
   playerMovementNotifier: PlayerMovementNotifier;
   playerService: PlayerService;
   projectileNotifier: ProjectileNotifier;
   characterEffectNotifier: CharacterEffectNotifier;
   cooldownService: CooldownService;
   timeEffectNotifier: TimeEffectNotifier;
   playerNotifier: PlayerNotifier;
   playerCharacterService: PlayerCharacterService;
   socketConnectionService: SocketConnectionService;
   questProgressService: QuestProgressService;
   movementQuestService: MovementQuestService;
   killingQuestService: KillingQuestService;
   powerPointsNotifier: PowerPointsNotifier;
   questNotifier: QuestNotifier;
   monsterService: MonsterService;
   respawnService: RespawnService;
   areaTimeEffectNotifier: AreaTimeEffectNotifier;
   powerPointsService: PowerPointsService;
   aggroService: AggroService;
   channelingNotifier: ChannelingNotifier;
   monsterAttackService: MonsterAttackService;
   spellPowerNotifier: SpellPowerNotifier;
   monsterNotifier: MonsterNotifier;
   manaService: ManaService;
   spellEffectApplierService: SpellEffectApplierService;
   spellAvailabilityService: SpellAvailabilityService;
   directInstantSpellService: DirectInstantSpellService;
   angleBlastSpellService: AngleBlastSpellService;
   areaSpellService: AreaSpellService;
   damageEffectService: DamageEffectService;
   generateSpellPowerEffectService: GenerateSpellPowerEffectService;
   healEffectService: HealEffectService;
   areaEffectService: AreaEffectService;
   monsterMovementService: MonsterMovementService;
   channelService: ChannelService;
   spellNotifier: SpellNotifier;
   tickEffectOverTimeService: TickEffectOverTimeService;
   bossFightService: BossFightService;
   guidedProjectilesService: GuidedProjectilesService;
   powerStackEffectService: PowerStackEffectService;
   absorbShieldEffectService: AbsorbShieldEffectService;
   teleportationSpellService: TeleportationSpellService;
   regenerationService: RegenerationService;
   absorbShieldNotifier: AbsorbShieldNotifier;
   characterNotifier: CharacterNotifier;
   activeCharacterNotifier: ActiveCharacterNotifier;
   areaNotifier: AreaNotifier;
}
