import React from 'react';
import { TimeEffectsbar } from '../../player/timeEffectsBar/TimeEffectsBar';
import styles from './ActivePlayerTimeEffects.module.scss';

export const ActivePlayerTimeEffects = ({ playerId }) => {
   return (
      <div className={styles.activePlayerTimeEffects}>
         <TimeEffectsbar playerId={playerId} />
      </div>
   );
};
