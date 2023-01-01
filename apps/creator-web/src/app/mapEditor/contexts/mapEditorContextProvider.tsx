import React, { useCallback, useContext, useState } from 'react';
import { ACTIONS } from '../../actions';
import { SocketContext } from '../../contexts';

export const MapEditorContext = React.createContext<any>(null);

export const MapEditorContextProvider = ({ children }: any) => {
   const { socket } = useContext(SocketContext);
   const [activeSprite, setActiveSprite] = useState<null>();

   const updateMapField = useCallback(
      ({ x, y, spriteId }) => {
         socket.send(JSON.stringify({ actionType: ACTIONS.UPDATE_MAP_FIELD, x, y, spriteId }));
      },
      [socket]
   );

   return <MapEditorContext.Provider value={{ updateMapField, activeSprite, setActiveSprite }}>{children}</MapEditorContext.Provider>;
};
