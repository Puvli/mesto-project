export class Section {
  constructor({ items, renderer }, elements, id, template) {
    this.items = items;
    this.id = id;
    this.template = template;
    this.renderer = renderer;
    this.elements = elements;
  }

  output() {
    this.renderer;
  }

  addItem(item) {
    this.elements.prepend(item);
  }

  renderItems() {
    this.items.forEach((item) => {
      this.addItem(this.renderer.call(this, item, this.id, this.template));
    })
  }
}
