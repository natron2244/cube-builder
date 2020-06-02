import { Injectable } from "@angular/core";
import { CardEntry, CardStatus } from "./interfaces";
import { CardProviderService } from "./card-provider.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  public constructor(private cardProvider: CardProviderService) {}
  public getCardEntries(): CardEntry[] {
    const allUniqueCards = this.cardProvider.getAllUniqueCards();
    const cardProviders = this.cardProvider.getCardProviders();
    const cardEntries: CardEntry[] = allUniqueCards.map((cardName) => {
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

  public getCardsWithStatus(status: CardStatus): CardEntry[] {
    return this.getCardEntries().filter((card) => card.cardStatus === status);
  }

  private getCardStatus(count, numberOfPlayers): CardStatus {
    return count >= numberOfPlayers
      ? CardStatus.Available
      : count >= numberOfPlayers - 1
      ? CardStatus.Craftable
      : CardStatus.Unavailable;
  }
}
