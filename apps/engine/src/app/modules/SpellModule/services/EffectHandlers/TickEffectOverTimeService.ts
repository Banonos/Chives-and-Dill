import { forEach } from 'lodash';
import { EngineEvents } from '../../../../EngineEvents';
import { EventParser } from '../../../../EventParser';
import { Character, EngineEventHandler } from '../../../../types';
import { MonsterEngineEvents, MonsterLostAggroEvent } from '../../../MonsterModule/Events';
import { Monster } from '../../../MonsterModule/types';
import { TickOverTimeEffectEngine } from '../../engines/TickOverTimeEffectEngine';
import { ApplyTargetSpellEffectEvent, RemoveTickOverTimeEffectEvent, SpellEngineEvents } from '../../Events';
import { TickOverTimeEffect, SpellEffectType } from '../../types/spellTypes';

export interface TickEffectOverTimeTrack {
   id: string;
   creationTime: number;
   effect: TickOverTimeEffect;
   target: Character | Monster;
   caster: Character | Monster;
}

export class TickEffectOverTimeService extends EventParser {
   tickOverTimeEffectEngine: TickOverTimeEffectEngine;
   activeTickEffectOverTime: Record<string, TickEffectOverTimeTrack> = {};

   constructor(tickOverTimeEffectEngine: TickOverTimeEffectEngine) {
      super();
      this.tickOverTimeEffectEngine = tickOverTimeEffectEngine;
      this.eventsToHandlersMap = {
         [SpellEngineEvents.ApplyTargetSpellEffect]: this.handleApplySpellEffect,
         [SpellEngineEvents.RemoveTickOverTimeEffect]: this.handleTickOverTimeFinished,
         [MonsterEngineEvents.MonsterLostAggro]: this.handleMonsterLostAggro,
      };
   }

   init(engineEventCrator, services) {
      super.init(engineEventCrator);
      this.tickOverTimeEffectEngine.init(engineEventCrator, services);
   }

   handleApplySpellEffect: EngineEventHandler<ApplyTargetSpellEffectEvent> = ({ event }) => {
      if (event.effect.type === SpellEffectType.TickEffectOverTime) {
         const effect = event.effect as TickOverTimeEffect;
         const id = `${effect.spellId}_${event.target.id}`;

         this.activeTickEffectOverTime[id] = {
            id,
            creationTime: Date.now(),
            effect,
            target: event.target,
            caster: event.caster,
         };
      }
   };

   handleTickOverTimeFinished: EngineEventHandler<RemoveTickOverTimeEffectEvent> = ({ event }) => {
      delete this.activeTickEffectOverTime[event.tickOverTimeId];
   };

   handleMonsterLostAggro: EngineEventHandler<MonsterLostAggroEvent> = ({ event }) => {
      forEach(Object.keys(this.activeTickEffectOverTime), (key) => {
         if (key.includes(`_${event.monsterId}`)) {
            delete this.activeTickEffectOverTime[key];
         }
      });
   };

   getActiveTickEffectOverTime = () => this.activeTickEffectOverTime;
}
