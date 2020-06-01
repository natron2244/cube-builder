import { Injectable } from "@angular/core";
import { CardEntry, CardStatus } from "./interfaces";
import * as NathansCards from "./player-data/nathan.json";
import * as OtherPlayer from "./player-data/example-player.json";

@Injectable({
  providedIn: "root",
})
export class CardService {
  public getCardEntries(): CardEntry[] {
    const nathansCards = NathansCards.cards;
    const otherPlayerCards = OtherPlayer.cards;
    const cardProviders = [nathansCards, otherPlayerCards];
    const merged = { ...nathansCards, ...otherPlayerCards };
    const allCardList = Object.getOwnPropertyNames(merged);
    console.log(`sharedCardList: ${JSON.stringify(allCardList)}`);
    // Nathan: Now check each list
    const cardEntries: CardEntry[] = allCardList.map((cardName) => {
      let count = 0;

      cardProviders.forEach((cards) => {
        const hasCard = !!cards[cardName];
        count = hasCard ? count + 1 : count;
      });
      return {
        name: cardName,
        cardStatus:
          count >= cardProviders.length
            ? CardStatus.Available
            : CardStatus.Unavailable,
      };
    });
    return cardEntries;
  }

  public getAvailableCards(): CardEntry[] {
    return this.getCardEntries().filter(
      (card) => card.cardStatus === CardStatus.Available
    );
  }
}
