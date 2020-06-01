import { Component } from "@angular/core";
import { CardEntry } from "../interfaces";
import { CardService } from "../card.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  cardMap: CardEntry[];
  constructor(cardService: CardService) {
    this.cardMap = cardService.getAvailableCards();
    console.log(`Avaiable Cards: ${JSON.stringify(this.cardMap)}`);
  }
}
