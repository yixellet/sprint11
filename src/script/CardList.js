'use strict';

class CardList {
  constructor(container) {
    this.container = container;
    this.cards = [];
  };

  addCard(card) {
    this.cards.push(card);
  }

  addToContainer(card) {
    this.container.appendChild(card.cardContainer);
  }

  render() {
    this.cards.forEach((card) => {
      this.addToContainer(card);
    })
  }
}
