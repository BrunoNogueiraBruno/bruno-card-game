type Translation = { [key: string]: string };

export interface ICard {
    label?: string;
    name: string;
    translation: Translation;
    suit: string;
    index: number;
    src: string;
}


export interface ICardComponent {
    defaultFaceDown?: boolean;
    attributes: ICard;
    faceDown?: boolean;
    preventFlip?: boolean;
    posBottom?: number;
    onClick?: () => void;
}