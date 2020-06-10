import { Injectable } from "@angular/core";
import { CardEntry, CardStatus } from "./interfaces";
import { CardProviderService } from "./card-provider.service";

@Injectable({
  providedIn: "root",
})
export class CardService {
  private cardEntries: CardEntry[] = [];

  public constructor(private cardProvider: CardProviderService) {
    this.cardEntries = this.generateCardEntries();
  }
  private generateCardEntries(): CardEntry[] {
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
    return this.cardEntries.filter((card) => card.cardStatus === status);
  }

  public getCratCardForUser(user: string): CardEntry[] {
    return this.cardEntries.filter(
      (card) =>
        card.cardStatus === CardStatus.Craftable &&
        card.missingPlayers.includes(user)
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
