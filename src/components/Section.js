export class Section {
    constructor({ items, renderer }, elements) {
      this.items = items;
      this.renderer = renderer;
      this.elements = elements;
    }
  
    output() {
      this.renderer;
    }
  
    addItem(item, cards) {
      cards.prepend(item);
    }
  }