import { Injectable } from "@angular/core";
import { CardProvider } from "./interfaces";

// Generated with https://csvjson.com/csv2json as hash
import * as NathansCards from "./player-data/nathan.json";
import * as OtherPlayer from "./player-data/example-player.json";
import * as Dustin from "./player-data/dustin.json";
import { from } from "rxjs";

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
        cards: NathansCards.cards,
      },
      {
        name: "Other",
        cards: OtherPlayer.cards,
      },
      {
        name: "Dustin",
        cards: Dustin.cards,
      },
    ];
  }
}
