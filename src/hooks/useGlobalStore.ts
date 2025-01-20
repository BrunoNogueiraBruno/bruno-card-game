import { create } from 'zustand'
import {  devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { ICard } from '../types/cards'
import { ISession } from '../types/session'
import { publishMessage } from '../functions/ably'

interface IGlobalStore {
  sessionOptions: ISession;
  drawPile: ICard[];
  discardPile: ICard[];
  handHost: ICard[];
  handClient: ICard[];
  setValue: (by: ICard[], type: keyof State) => void;
  setSessionOptions: (by: ISession) => void;
}

type State = {
  sessionOptions: ISession;
  drawPile: ICard[];
  discardPile: ICard[];
  handHost: ICard[];
  handClient: ICard[];
};

const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist(
      (set) => ({
        sessionOptions: {currentUser:{id: "",role: "host"}, listOfUsers: []},
        drawPile: [],
        discardPile: [],
        handHost: [],
        handClient: [],
        setValue: (by: ICard[], type: keyof State) =>
          set((state) => {
            const userId = localStorage.getItem("user-id")
            
            if (userId) {
              publishMessage(userId, "state", state)
            }

            return {
              ...state,
              [type]: by,
            }
          }),
        setSessionOptions: (by: ISession) =>
          set((state) => ({
            ...state,
            sessionOptions: by
          }))
      }),
      {
        name: 'global-storage',
      }
    )
  )
);

export default useGlobalStore;
