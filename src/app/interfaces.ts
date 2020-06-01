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
