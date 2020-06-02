import { Injectable } from "@angular/core";
import { CardProvider } from "./interfaces";

// Generated with https://csvjson.com/csv2json as hash
import * as NathansCards from "./player-data/nathan.json";
import * as AlexsCards from "./player-data/alex.json";
// import * as OtherPlayer from "./player-data/example-player.json";
// import * as Dustin from "./player-data/dustin.json";

@Injectable({
  providedIn: "root",
})
export class CardProviderService {
  public getAllUniqueCards(): string[] {
    let cardMap = {};
    this.getCardProviders().forEach(
      ({ cards }) => (cardMap = { ...cardMap, ...cards })
    );
    return Object.getOwnPropertyNames(cardMap);
  }
  public getCardProviders(): CardProvider[] {
    return [
      {
        name: "Nathan",
        cards: this.cleanCardData(NathansCards.cards),
      },
      {
        name: "Alex",
        cards: this.cleanCardData(AlexsCards.cards),
      },
      // {
      //   name: "Other",
      //   cards: OtherPlayer.cards,
      // },
      // {
      //   name: "Dustin",
      //   cards: Dustin.cards,
      // },
    ];
  }

  private cleanCardData(cards: any): any[] {
    let cleanedCards = cards;
    const basicLands = ["Forest", "Island", "Mountain", "Swamp", "Plains"];
    basicLands.forEach((basicLand) => (cleanedCards[basicLand] = undefined));

    // const token = "token";
    // cleanedCards = cleanedCards.filter((card) => card.type !== token);

    return cleanedCards;
  }
}
