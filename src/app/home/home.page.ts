import { Component } from "@angular/core";
import { CardEntry, CardStatus } from "../interfaces";
import { CardService } from "../card.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  availableCards: CardEntry[] = [];
  craftableCards: CardEntry[] = [];

  // cardName: string;
  // card: CardEntry;
  constructor(private cardService: CardService) {
    this.availableCards = this.cardService.getCardsWithStatus(
      CardStatus.Available
    );
    this.craftableCards = this.cardService.getCardsWithStatus(
      CardStatus.Craftable
    );

    //this.availableCards = this.cardService.getCratCardForUser("Alex");
    // this.card = this.availableCards?.[0];
    // this.cardName = this?.card?.name;

    console.log(`Available Cards: ${JSON.stringify(this.availableCards)}`);
  }
}
