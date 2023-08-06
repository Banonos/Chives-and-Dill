
import React from 'react';
import { QueryModalManager } from './guiContent/QueryModalManager';
import { BottomBar } from './guiContent/bottomBar/BottomBar';
import { CharacterFrames } from './guiContent/characterFrames/CharacterFrames';
import { ChatManager } from './guiContent/chat';
import { Details } from './guiContent/details/Details';
import { NpcModal } from './guiContent/npcModal/NpcModal';
import { PartyModal } from './guiContent/party/Party';
import { QuestManager } from './guiContent/quests';

export function GameUserInterface() {

    /*      {activeCharacterId ? <ActivePlayerTimeEffects playerId={activeCharacterId} /> : null}
            {!_.isEmpty(activeLoot[Object.keys(activeLoot ?? {})?.[0]]) ? <LootModal
                monsterId={Object.keys(activeLoot ?? {})?.[0]}
                activeLoot={activeLoot[Object.keys(activeLoot ?? {})?.[0]]} /> : null}
         */

    return (
        <>
            <CharacterFrames />
            <ChatManager />
            <Details />
            <QueryModalManager />
            <QuestManager />
            <PartyModal />
            <BottomBar />
            <NpcModal />
        </>
    );
}
