import { Injectable } from "@angular/core";
import { CardProvider, Card } from "./interfaces";

// Generated with https://csvjson.com/csv2json as hash
// import * as NathansCards from "./player-data/nathan.json";
// import * as AlexsCards from "./player-data/alex.json";
// import * as DustinCards from "./player-data/dustin.json";
// import * as DonnyCards from "./player-data/donny.json";

// For CVS to JSON
// "name","count","type","set","number"
// type = rareity
import * as NathansCards from "./new-player-data/nathans-cards.json";
import * as AlexsCards from "./new-player-data/alexs-cards.json";
import * as DustinCards from "./new-player-data/dustins-cards.json";
import * as DonnyCards from "./new-player-data/donnys-cards.json";

@Injectable({
  providedIn: "root",
})
export class CardProviderService {
  public getAllUniqueCards(): string[] {
    let cardNames: string[] = [];
    this.getCardProviders().forEach(({ cards }) => {
      if (cardNames.length === 0) {
        cardNames = cardNames.concat(cards.map((card) => card.name));
      } else {
        cards.forEach((card) => {
          if (!cardNames.includes(card.name)) {
            cardNames.push(card.name);
          }
        });
      }
    });
    return cardNames;
  }
  public getCardProviders(): CardProvider[] {
    return [
      {
        name: "Nathan",
        cards: this.cleanCardData(NathansCards),
      },
      {
        name: "Alex",
        cards: this.cleanCardData(AlexsCards),
      },
      {
        name: "Donny",
        cards: this.cleanCardData(DonnyCards),
      },
      {
        name: "Dustin",
        cards: this.cleanCardData(DustinCards),
      },
    ];
  }

  private cleanCardData(cards: any): Card[] {
    const basicLands = ["Forest", "Island", "Mountain", "Swamp", "Plains"];

    const cleanedCards = [];
    cards.default.forEach((card) => {
      if (!basicLands.includes(card.name)) {
        const cardEntry = cleanedCards.find(
          (cleanedCard) => cleanedCard.name === card.name
        );
        cardEntry ? (cardEntry.count += card.count) : cleanedCards.push(card);
      }
    });

    return cleanedCards;
  }
}
