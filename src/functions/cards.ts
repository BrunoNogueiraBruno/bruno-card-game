import cards from '../assets/cards/cards.json'
import { ICard } from '../types/cards'

export const shuffle = (array = [...cards] as ICard[], index = 0 as number): ICard[] => {
    const { length } = array;
  
    if (index >= length) return array
  
    const randomIndex = Math.floor(Math.random() * length);
  
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  
    return shuffle(array, index + 1);
}
