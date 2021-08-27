import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './PlayerIcon.module.scss';
import { getEngineState, selectCharacters } from '../../../stores';
import { TimeEffectsbar } from '../timeEffectsBar/TimeEffectsBar';
import { GetAbsorbsValue } from "../GetPlayerAbsorbs";

export const PlayerIcon = ({ playerId }) => {

   const engineState = useSelector(getEngineState);
   const players = useSelector(selectCharacters);
   const player = players[playerId];
   const { name, avatar } = player;
   const playerAbsorb = GetAbsorbsValue(playerId);
   const [absorbBarWidth, setAbsorbBarWidth] = useState(0);

   const playerPoints = engineState.characterPowerPoints.data[playerId];
   const powerStacks = engineState.powerStacks.data[playerId]?.HolyPower;

   useEffect(() => {
      if (!playerPoints) {
         return;
      }

      setAbsorbBarWidth((playerAbsorb / (playerAbsorb + playerPoints.maxHp)) * 100);
   }, [playerAbsorb, playerPoints]);

   if (!playerPoints) {
      return <></>;
   }

   const renderPowerStacks = (stacksType, amount) => {
      if (!amount) {
         return;
      }
      return Array.from(Array(amount).keys()).map((i) => <div className={styles.powerStackCircle} />)
   }

   const { maxHp, currentHp, currentSpellPower, maxSpellPower } = playerPoints;

   return (
      <div>
         <div className={styles.playerIconContainer}>
            <div className={styles.playerAvatar} style={{ backgroundImage: `url(${avatar})` }}></div>
            <div className={styles.playerLvl}>69</div>
            <div className={styles.playerRole} />
            <div className={styles.barsContainer}>
               <div className={styles.nameBar}>{name}</div>
               <div className={styles.bar}>
                  <div className={styles.barText}>{currentHp >= 0 ? currentHp + '/' + maxHp : 0}</div>
                  <div className={styles.hpColor} style={{ width: currentHp >= 0 ? (currentHp / maxHp) * 100 + '%' : '0' }}></div>
                  <div className={styles.absorbColor} style={{ width: absorbBarWidth + '%' }}></div>
               </div>
               <div className={styles.bar}>
                  <div className={styles.barText}>{currentSpellPower >= 0 ? currentSpellPower + '/' + maxSpellPower : 0}</div>
                  <div className={styles.manaColor} style={{ width: currentSpellPower >= 0 ? (currentSpellPower / maxSpellPower) * 100 + '%' : '0' }}></div>
               </div>
            </div>
         </div>
         <div className={styles.powerStacks}>
            {renderPowerStacks("HolyPower", powerStacks)}
         </div>
         <TimeEffectsbar playerId={playerId} />
      </div>
   );
};
