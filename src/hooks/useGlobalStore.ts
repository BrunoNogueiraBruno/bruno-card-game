import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { ICard } from '../types/cards'

interface IGlobalStore {
  drawPile: ICard[];
  discardPile: ICard[];
  handFront: ICard[];
  handBack: ICard[];
  setValue: (by: ICard[], type: keyof State) => void;
}

type State = {
  drawPile: ICard[];
  discardPile: ICard[];
  handFront: ICard[];
  handBack: ICard[];
};

const useGlobalStore = create<IGlobalStore>()(
  devtools(
    persist(
      (set) => ({
        drawPile: [],
        discardPile: [],
        handFront: [],
        handBack: [],
        setValue: (by: ICard[], type: keyof State) =>
          set((state) => ({
            ...state,
            [type]: by,
          })),
      }),
      {
        name: 'global-storage',
      }
    )
  )
);

export default useGlobalStore;
