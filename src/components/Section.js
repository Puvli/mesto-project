export class Section {
  constructor({ items, renderer }, elements, id, template) {
    this.items = items;
    this.id = id;
    this.template = template;
    this.renderer = renderer;
    // this.elements = document.querySelector(elements);
    this.elements = elements;
  }

  output() {
    this.renderer;
  }

  addItem(item) {
    this.elements.prepend(item);
  }

  renderItems() {
    // this.items.forEach((item) => {
    // this.renderer.call(this, item, id, templateSelector);
    // const mas = this.renderer;
    // for (let i = 0; i < mas.length; i++) {
    this.renderer.forEach((item) => {
      // this.elements.prepend(item);
      this.addItem(item);
    });
    // this.elements.prepend(mas[i]);
    // }
    // });
  }
}
