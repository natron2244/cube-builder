import { Injectable } from "@angular/core";
import { CardEntry, CardStatus } from "./interfaces";
import * as NathansCards from "./player-data/nathan.json";
import * as OtherPlayer from "./player-data/example-player.json";
import * as Dustin from "./player-data/dustin.json";

interface CardProvider {
  name: string;
  cards: any;
}

@Injectable({
  providedIn: "root",
})
export class CardService {
  public getCardEntries(): CardEntry[] {
    const nathansCards = NathansCards.cards;
    const otherPlayerCards = OtherPlayer.cards;
    const dustinsCards = Dustin.cards;

    const merged = { ...nathansCards, ...otherPlayerCards, ...dustinsCards };
    const allCardList = Object.getOwnPropertyNames(merged);
    console.log(`sharedCardList: ${JSON.stringify(allCardList)}`);
    // Nathan: Now check each list

    const cardProviders: CardProvider[] = [
      {
        name: "Nathan",
        cards: nathansCards,
      },
      {
        name: "Other",
        cards: otherPlayerCards,
      },
      {
        name: "Dustin",
        cards: dustinsCards,
      },
    ];
    const cardEntries: CardEntry[] = allCardList.map((cardName) => {
      let count = 0;
      const missingPlayers: string[] = [];
      cardProviders.forEach(({ name, cards }) => {
        const hasCard = !!cards[cardName];
        if (!hasCard) {
          missingPlayers.push(name);
        }
        count = hasCard ? count + 1 : count;
      });
      return {
        name: cardName,
        missingPlayers,
        cardStatus: this.getCardStatus(count, cardProviders.length),
      };
    });
    return cardEntries;
  }

  public getAvailableCards(): CardEntry[] {
    return this.getCardEntries().filter(
      (card) => card.cardStatus !== CardStatus.Unavailable
    );
  }

  private getCardStatus(count, numberOfPlayers): CardStatus {
    return count >= numberOfPlayers
      ? CardStatus.Available
      : count >= numberOfPlayers - 1
      ? CardStatus.Craftable
      : CardStatus.Unavailable;
  }
}
