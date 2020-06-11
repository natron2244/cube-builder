export enum CardStatus {
  Available,
  Unavailable,
  Craftable,
}
export interface CardEntry {
  name: string;
  cardStatus: CardStatus;
  missingPlayers?: string[];
}

export interface Card {
  name: string;
  count: number;
  type: string;
  set: string;
  number: number;
}

export interface CardProvider {
  name: string;
  cards: Card[];
}
