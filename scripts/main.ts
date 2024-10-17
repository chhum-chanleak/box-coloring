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
    console.log("container has been created.");

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
  public createBox = (choice: number = 30): Element => {
    const box = document.createElement("div");

    // increase '_numberOfBoxes' by 1.
    this.increaseNumberOfBoxes();
    box.setAttribute("class", `box ${this._numberOfBoxes}`);

    if (choice === 30) {      
      box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;
    } else if (choice === 17) {
      box.style.cssText = `width: 40px; height: 40px; border: 1px solid #000;`;
    } else {
      throw new Error("The available choice is either 30 or 17.");
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
  public showContainer(choice: number = 30): void {
    // If there are already '.box's inside 'div.container', then delete the old one.
    this.removeContainerAndBoxes();
    // If there is no 'div.container' inside <main>, then create one.
    this.addNewContainer();

    const container = document.querySelector('div.container') as HTMLElement;

    if (choice === 30) {
      container.style.cssText = `
        width: 600px;
        height: 600px;
      `;
      // Fill 'container' with small boxes.
      this.fillContainer(choice);
      // Remove top and left borders of any '.box' which is not a part of 'firstRowBoxes' and 'firstColumnBoxes'.
      this.removeTopBorder();
      this.removeLeftBorder();
    } else if (choice === 17) {
      container.style.cssText = `
        width: 700px;
        height: 700px;
    `;
      // Fill 'container' with big boxes.
      this.fillContainer(choice);
      // Remove top and left borders of any '.box' which is not a part of 'firstRowBoxes' and 'firstColumnBoxes'.
      this.removeTopBorder();
      this.removeLeftBorder();
    } else {
      throw new Error("The available choice is either 30 or 17.");
    }
  }

  // Fill 'container' with boxes.
  public fillContainer(choice: number): void {
    const container = document.querySelector("div.container") as HTMLElement;

    if (choice === 30) {
      for (let i = 0; i < 900; i += 1) {
        container.appendChild(this.createBox(choice));
      }
    } else if (choice === 17) {
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

  // Check whether 'boxes' are '30x30' or '19x19'.
  public getBoxesModel(): string {
    const box = document.querySelector('.box') as HTMLElement;

    if (box) {
      return box.style.width === "20px" ? "30x30" : "19x19";
    } else {
      throw new Error("'.box' does not exist.");
    }
  }

  
  // Get 'excludesBoxes' from 'boxes' inside 'div.container' which will be used later to style 'boxes' inside 'div.container'.
  public getExcludedBoxes(direction: string): Element[] {
    const boxes = document.querySelectorAll('.box');
    let excludesBoxes = [] as Element[];

    // Check if the model of 'boxes' inside the 'div.container' are '30x30' or '19x19'.
    if (this.getBoxesModel() === "30x30") {
      if (direction === 'row') {
        for (let i = 0; i < 30; i += 1) {
          excludesBoxes.push(boxes[i]);
        }
      } else if (direction === 'column') {
        for (let i = 0; i < 871; i += 30) {
          excludesBoxes.push(boxes[i]);
        }
      }
    } else if (this.getBoxesModel() === "19x19") {
      if (direction === 'row') {
        for (let i = 0; i < 17; i += 1) {
          excludesBoxes.push(boxes[i]);
        }
      } else if (direction === 'column') {
        for (let i = 0; i < 307; i += 17) {
          excludesBoxes.push(boxes[i]);
        }
      }
    } else {
      throw new Error("The available choice is either 'row' or 'column'.");
    }

    return excludesBoxes;
  }

  // Remove top border of all '.box' that is not of part of the first row inside of 'div.container'.
  public removeTopBorder() {
    const boxes = document.querySelectorAll(".box");
    const firstRowBoxes = this.getExcludedBoxes('row');

    if (this.getBoxesModel()) { // When there are '.box' inside 'div.container'.
      for (let i = 0; i < boxes.length; i += 1) {
        const box = boxes[i] as HTMLElement;
        
        // when 'box' is NOT one of 'firstRowBoxes', then remove 'box''s top border.
        if (!firstRowBoxes.includes(box)) {
          box.style.borderTop = 'none';
        }
      }
    }
  }

  // Remove left border of all '.box' that is not of part of the first column inside of 'div.container'.
  public removeLeftBorder() {
    const boxes = document.querySelectorAll(".box");
    const firstColumnBoxes = this.getExcludedBoxes('column');

    if (this.getBoxesModel()) { // When there are '.box' inside 'div.container'.
      for (let i = 0; i < boxes.length; i += 1) {
        const box = boxes[i] as HTMLElement;
        
        // when 'box' is NOT one of 'firstColumnBoxes', then remove 'box''s top border.
        if (!firstColumnBoxes.includes(box)) {
          box.style.borderLeft = 'none';
        }
      }
    }
  }
}

// Button factory pattern
// Button Interface
interface Button {
  _style: {
    background_color: string,
    textContent: string,
  };

  createNode(): HTMLElement;
}

// Concrete Button
class ThirtyByThirty implements Button {
  _style = {
    background_color: "#FF0000",
    textContent: "30 x 30",
  };

 public createNode(): HTMLElement {
    const THIRTY_BY_THIRTY_BUTTON = document.createElement("button") as HTMLElement;
    const { background_color, textContent } = this._style;

    THIRTY_BY_THIRTY_BUTTON.style.backgroundColor = `${background_color}`;
    THIRTY_BY_THIRTY_BUTTON.textContent = `${textContent}`;

    return THIRTY_BY_THIRTY_BUTTON;
  }
}

class SeventeenBySeventeen implements Button {
  _style = {
    background_color: "#FF7F00",
    textContent: "17 x 17",
  };

 public createNode(): HTMLElement {
    const SEVENTEEN_BY_SEVENTEEN_BUTTON = document.createElement("button") as HTMLElement;
    const { background_color, textContent } = this._style;

    SEVENTEEN_BY_SEVENTEEN_BUTTON.style.backgroundColor = `${background_color}`;
    SEVENTEEN_BY_SEVENTEEN_BUTTON.textContent = `${textContent}`;

    return SEVENTEEN_BY_SEVENTEEN_BUTTON;
  }
}

class RandomColor implements Button {
  _style = {
    background_color: "#FFFF00",
    textContent: "Random Color",
  };

 public createNode(): HTMLElement {
    const RANDOM_BUTTON = document.createElement("button") as HTMLElement;
    const { background_color, textContent } = this._style;

    RANDOM_BUTTON.style.backgroundColor = `${background_color}`;
    RANDOM_BUTTON.textContent = `${textContent}`;

    return RANDOM_BUTTON;
  }
}

class MultiColors implements Button {
  _style = {
    background_color: "#00FF00",
    textContent: "Multi-Colors",
  };

  createNode(): HTMLElement {
    const MULTI_COLORS_BUTTON = document.createElement("button") as HTMLElement;
    const { background_color, textContent } = this._style;

    MULTI_COLORS_BUTTON.style.backgroundColor = `${background_color}`;
    MULTI_COLORS_BUTTON.textContent = `${textContent}`;

    return MULTI_COLORS_BUTTON;
  }
}

class Refresh implements Button {
  _style = {
    background_color: "#0000FF",
    textContent: "Refresh",
  };

  createNode(): HTMLElement {
    const REFRESH_BUTTON = document.createElement("button") as HTMLElement;
    const { background_color, textContent } = this._style;

    REFRESH_BUTTON.style.backgroundColor = `${background_color}`;
    REFRESH_BUTTON.textContent = `${textContent}`;

    return REFRESH_BUTTON;
  }
}

// Button factory
class ButtonFactory {
  public static createButton(name: string): Button {
    switch(name) {
      case "30x30":
        return new ThirtyByThirty();
      case "17x17":
        return new SeventeenBySeventeen();
      case "random":
        return new RandomColor();
      case "multi":
        return new MultiColors();
      case "refresh":
        return new Refresh();
      default:
        throw new Error(`${name} button is not available.`);
    }
  }

  public showDetail(): void {
    console.log("Available buttons are : pallete, 30x30, 17x17, random, multi, and refresh.");
  }
}

// Merge namespace with class 'ButtonFactory'
namespace ButtonFactory {
  export const THIRTY_BY_THIRTY_BUTTON = ButtonFactory.createButton("30x30");
  export const SEVENTEEN_BY_SEVENTEEN_BUTTON = ButtonFactory.createButton("17x17");
  export const RANDOM_BUTTON = ButtonFactory.createButton("random");
  export const MULTI_COLORS_BUTTON = ButtonFactory.createButton("multi");
  export const REFRESH_BUTTON = ButtonFactory.createButton("refresh");
}

// Utility functions

// Add buttons of class 'ButtonFactory' to 'div.buttons'.
type DeployButtons = () => void;
const deployButtons: DeployButtons = () => {
  const DIV_BUTTONS = document.querySelector("div.buttons") as HTMLElement;

  const BUTTONS = [
    ButtonFactory.THIRTY_BY_THIRTY_BUTTON.createNode(),
    ButtonFactory.SEVENTEEN_BY_SEVENTEEN_BUTTON.createNode(),
    ButtonFactory.RANDOM_BUTTON.createNode(),
    ButtonFactory.MULTI_COLORS_BUTTON.createNode(),
    ButtonFactory.REFRESH_BUTTON.createNode(),
  ];

  for (let i = 0; i < BUTTONS.length; i += 1) {
    // Append buttons to 'div.buttons'.
    DIV_BUTTONS.appendChild(BUTTONS[i]);
  }
};

const container = Container.getInstance();