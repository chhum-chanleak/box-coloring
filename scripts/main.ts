class Container {
  // A static property to hold a singleton instance.
  private static instance: Container;
  // Public fields
  public _className: string;
  public _numberOfBoxes: number;
  public _currentColor: string;
  public _node: HTMLElement;

  // Private constructor prevents direct instantiation from outside the class.
  private constructor() {
    console.log("container has been created");

    this._className = "";
    this._numberOfBoxes = 0;
    this._currentColor = "#00f";
    this._node = document.querySelector('div.container') as HTMLElement;
  }

  // Static method to provide access to the instance.
  public static getInstance(): Container {

    if (!Container.instance) {
      // Create instance if there is no instance.
      Container.instance = new Container();
    }

    return Container.instance;
  }

  get className(): string {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }

  get numberOfBoxes(): number {
    return this._numberOfBoxes;
  }

  set numberOfBoxes(amount) {
    this._numberOfBoxes = amount;
  }

  public increaseNumberOfBoxes(): void {
    this._numberOfBoxes += 1;
  }

  get currentColor(): string {
    return this._currentColor;
  }

  set currentColor(color: string) {
    this._currentColor = color;
  }

  get node(): HTMLElement {
    return this._node;
  }

  // A box for container
  public createBox = (choice: number):  Element => {
    const box = document.createElement("div");

    // increase '_numberOfBoxes' by 1.
    this.increaseNumberOfBoxes();
    box.setAttribute("class", `box ${this._numberOfBoxes}`);

    if (choice === 16) {      
      box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;
    } else if (choice === 32) {
      box.style.cssText = `width: 40px; height: 40px; border: 1px solid #000;`;
    } else {
      throw new Error("The available choice is either 16 or 32.");
    }

    return box;
  }

  // Handle event which changes background color of 'box' when hovering.
  public handleBox(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    target.style.backgroundColor = `${container.currentColor}`;
  }

  // Apply 'mouseenter' event to all boxes.
  public applyEventToAllBoxes(): void {
    const boxes = document.querySelectorAll(".box");

    for (let i = 0; i < boxes.length; i += 1) {
      const box = boxes[i] as HTMLElement;

      box.addEventListener("mouseenter", this.handleBox);
    }
  }

  // Show 'container' to the webpage
  public showContainer(choice: number): void {

    // If there is no 'div.container' inside <main>, then create one.
    this.addNewContainer();

    const container = document.querySelector('div.container') as HTMLElement;

    if (choice === 16) {
      container.style.cssText = `
        width: 600px;
        height: 600px;
      `;
      // Fill 'container' with small boxes.
      this.fillContainer(choice);
    } else if (choice === 32) {
      container.style.cssText = `
        width: 700px;
        height: 700px;
    `;
    // Fill 'container' with big boxes.
    this.fillContainer(choice);
    } else {
      throw new Error("The available choice is either 16 or 32.");
    }
  }

  // Fill 'container' with boxes.
  public fillContainer(choice: number): void {
    const container = document.querySelector("div.container") as HTMLElement;

    if (choice === 16) {
      for (let i = 0; i < 900; i += 1) {
        container.appendChild(this.createBox(choice));
      }
    } else if (choice === 32) {
      for (let i = 0; i < 323; i += 1) {
        container.appendChild(this.createBox(choice));
      }
    }
  }

  // Remove 'div.container' the boxes inside of it from the DOM and set '_numberOfBoxes' to 0.
  public removeContainerAndBoxes(): void {
    const boxes = document.querySelectorAll(".box");

    // Remove 'div.container'.
    this._node.remove();
    // Remove 'boxes' inside of 'div.container'.
    for (let i = 0; i < boxes.length; i += 1) {
      boxes[i].remove();
    }

    // Set '_numberOfBoxes' to 0.
    this.numberOfBoxes = 0;
  }

  // Add a 'div.container' to <main> when there isn't any 'div.container'.
  public addNewContainer(): void {
    const main = document.querySelector("main") as HTMLElement;
    const currentContainer = document.querySelector("div.container") as HTMLElement;
    const newContainer = document.createElement("div") as HTMLElement;

    newContainer.setAttribute("class", "container");

    if (!currentContainer) {
      main.appendChild(newContainer);
    }
  }
}

const container = Container.getInstance();