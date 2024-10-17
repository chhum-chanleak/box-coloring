"use strict";
class Container {
    // Private constructor prevents direct instantiation from outside the class.
    constructor() {
        // A box for container
        this.createBox = (choice = 30) => {
            const box = document.createElement("div");
            // increase '_numberOfBoxes' by 1.
            this.increaseNumberOfBoxes();
            box.setAttribute("class", `box ${this._numberOfBoxes}`);
            if (choice === 30) {
                box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;
            }
            else if (choice === 17) {
                box.style.cssText = `width: 40px; height: 40px; border: 1px solid #000;`;
            }
            else {
                throw new Error("The available choice is either 30 or 17.");
            }
            return box;
        };
        console.log("container has been created.");
        this._className = "";
        this._numberOfBoxes = 0;
        this._currentColor = "#00f";
        this._node = document.querySelector('div.container');
        this._colorIsRandom = false;
    }
    // Static method to provide access to the instance.
    static getInstance() {
        if (!Container.instance) {
            // Create instance if there is no instance.
            Container.instance = new Container();
        }
        return Container.instance;
    }
    get className() {
        return this._className;
    }
    set className(value) {
        this._className = value;
    }
    get numberOfBoxes() {
        return this._numberOfBoxes;
    }
    set numberOfBoxes(amount) {
        this._numberOfBoxes = amount;
    }
    increaseNumberOfBoxes() {
        this._numberOfBoxes += 1;
    }
    get currentColor() {
        return this._currentColor;
    }
    set currentColor(color) {
        this._currentColor = color;
    }
    get node() {
        return this._node;
    }
    get colorIsRandom() {
        return this._colorIsRandom;
    }
    set colorIsRandom(state) {
        this._colorIsRandom = state;
    }
    // Handle event which changes background color of 'box' when hovering.
    handleBox(event) {
        const target = event.target;
        target.style.backgroundColor = `${container.currentColor}`;
    }
    // Apply 'mouseenter' event to all boxes.
    applyEventToAllBoxes() {
        const boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i += 1) {
            const box = boxes[i];
            box.addEventListener("mouseenter", this.handleBox);
        }
    }
    // Show 'container' to the webpage
    showContainer(choice = 30) {
        // If there are already '.box's inside 'div.container', then delete the old one.
        this.removeContainerAndBoxes();
        // If there is no 'div.container' inside <main>, then create one.
        this.addNewContainer();
        const container = document.querySelector('div.container');
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
        }
        else if (choice === 17) {
            container.style.cssText = `
        width: 700px;
        height: 700px;
    `;
            // Fill 'container' with big boxes.
            this.fillContainer(choice);
            // Remove top and left borders of any '.box' which is not a part of 'firstRowBoxes' and 'firstColumnBoxes'.
            this.removeTopBorder();
            this.removeLeftBorder();
        }
        else {
            throw new Error("The available choice is either 30 or 17.");
        }
        // Apply event to each '.box' inside 'div.container'.
        this.applyEventToAllBoxes();
    }
    // Fill 'container' with boxes.
    fillContainer(choice) {
        const container = document.querySelector("div.container");
        if (choice === 30) {
            for (let i = 0; i < 900; i += 1) {
                container.appendChild(this.createBox(choice));
            }
        }
        else if (choice === 17) {
            for (let i = 0; i < 323; i += 1) {
                container.appendChild(this.createBox(choice));
            }
        }
    }
    // Remove 'div.container' the boxes inside of it from the DOM and set '_numberOfBoxes' to 0.
    removeContainerAndBoxes() {
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
    addNewContainer() {
        const main = document.querySelector("main");
        const currentContainer = document.querySelector("div.container");
        const newContainer = document.createElement("div");
        newContainer.setAttribute("class", "container");
        if (!currentContainer) {
            main.appendChild(newContainer);
        }
    }
    // Check whether 'boxes' are '30x30' or '19x19'.
    getBoxesModel() {
        const box = document.querySelector('.box');
        if (box) {
            return box.style.width === "20px" ? "30x30" : "19x19";
        }
        else {
            throw new Error("'.box' does not exist.");
        }
    }
    // Get 'excludesBoxes' from 'boxes' inside 'div.container' which will be used later to style 'boxes' inside 'div.container'.
    getExcludedBoxes(direction) {
        const boxes = document.querySelectorAll('.box');
        let excludesBoxes = [];
        // Check if the model of 'boxes' inside the 'div.container' are '30x30' or '19x19'.
        if (this.getBoxesModel() === "30x30") {
            if (direction === 'row') {
                for (let i = 0; i < 30; i += 1) {
                    excludesBoxes.push(boxes[i]);
                }
            }
            else if (direction === 'column') {
                for (let i = 0; i < 871; i += 30) {
                    excludesBoxes.push(boxes[i]);
                }
            }
        }
        else if (this.getBoxesModel() === "19x19") {
            if (direction === 'row') {
                for (let i = 0; i < 17; i += 1) {
                    excludesBoxes.push(boxes[i]);
                }
            }
            else if (direction === 'column') {
                for (let i = 0; i < 307; i += 17) {
                    excludesBoxes.push(boxes[i]);
                }
            }
        }
        else {
            throw new Error("The available choice is either 'row' or 'column'.");
        }
        return excludesBoxes;
    }
    // Remove top border of all '.box' that is not of part of the first row inside of 'div.container'.
    removeTopBorder() {
        const boxes = document.querySelectorAll(".box");
        const firstRowBoxes = this.getExcludedBoxes('row');
        if (this.getBoxesModel()) { // When there are '.box' inside 'div.container'.
            for (let i = 0; i < boxes.length; i += 1) {
                const box = boxes[i];
                // when 'box' is NOT one of 'firstRowBoxes', then remove 'box''s top border.
                if (!firstRowBoxes.includes(box)) {
                    box.style.borderTop = 'none';
                }
            }
        }
    }
    // Remove left border of all '.box' that is not of part of the first column inside of 'div.container'.
    removeLeftBorder() {
        const boxes = document.querySelectorAll(".box");
        const firstColumnBoxes = this.getExcludedBoxes('column');
        if (this.getBoxesModel()) { // When there are '.box' inside 'div.container'.
            for (let i = 0; i < boxes.length; i += 1) {
                const box = boxes[i];
                // when 'box' is NOT one of 'firstColumnBoxes', then remove 'box''s top border.
                if (!firstColumnBoxes.includes(box)) {
                    box.style.borderLeft = 'none';
                }
            }
        }
    }
}
// Concrete Button
class ThirtyByThirty {
    constructor() {
        this._style = {
            background_color: "#FF0000",
            textContent: "30 x 30",
        };
    }
    createNode() {
        const THIRTY_BY_THIRTY_BUTTON = document.createElement("button");
        const { background_color, textContent } = this._style;
        // "click" event handling function for this 'button'.
        const handler = () => container.showContainer(30);
        THIRTY_BY_THIRTY_BUTTON.style.backgroundColor = `${background_color}`;
        THIRTY_BY_THIRTY_BUTTON.textContent = `${textContent}`;
        // Apply event to this 'button', which replace 'div.container' with a new 'div.container'.
        THIRTY_BY_THIRTY_BUTTON.addEventListener("click", handler);
        return THIRTY_BY_THIRTY_BUTTON;
    }
}
class SeventeenBySeventeen {
    constructor() {
        this._style = {
            background_color: "#FF7F00",
            textContent: "17 x 17",
        };
    }
    createNode() {
        const SEVENTEEN_BY_SEVENTEEN_BUTTON = document.createElement("button");
        const { background_color, textContent } = this._style;
        // "click" event handling function for this 'button'.
        const handler = () => container.showContainer(17);
        SEVENTEEN_BY_SEVENTEEN_BUTTON.style.backgroundColor = `${background_color}`;
        SEVENTEEN_BY_SEVENTEEN_BUTTON.textContent = `${textContent}`;
        // Apply event to this 'button', which replace 'div.container' with a new 'div.container'.
        SEVENTEEN_BY_SEVENTEEN_BUTTON.addEventListener("click", handler);
        return SEVENTEEN_BY_SEVENTEEN_BUTTON;
    }
}
class RandomColor {
    constructor() {
        this._style = {
            background_color: "#FFFF00",
            textContent: "Random Color",
        };
    }
    createNode() {
        const RANDOM_BUTTON = document.createElement("button");
        const { background_color, textContent } = this._style;
        RANDOM_BUTTON.style.backgroundColor = `${background_color}`;
        RANDOM_BUTTON.textContent = `${textContent}`;
        return RANDOM_BUTTON;
    }
}
class MultiColors {
    constructor() {
        this._style = {
            background_color: "#00FF00",
            textContent: "Multi-Colors",
        };
    }
    createNode() {
        const MULTI_COLORS_BUTTON = document.createElement("button");
        const { background_color, textContent } = this._style;
        MULTI_COLORS_BUTTON.style.backgroundColor = `${background_color}`;
        MULTI_COLORS_BUTTON.textContent = `${textContent}`;
        return MULTI_COLORS_BUTTON;
    }
}
class Refresh {
    constructor() {
        this._style = {
            background_color: "#0000FF",
            textContent: "Refresh",
        };
    }
    createNode() {
        const REFRESH_BUTTON = document.createElement("button");
        const { background_color, textContent } = this._style;
        REFRESH_BUTTON.style.backgroundColor = `${background_color}`;
        REFRESH_BUTTON.textContent = `${textContent}`;
        return REFRESH_BUTTON;
    }
}
// Button factory
class ButtonFactory {
    static createButton(name) {
        switch (name) {
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
    showDetail() {
        console.log("Available buttons are : pallete, 30x30, 17x17, random, multi, and refresh.");
    }
}
// Merge namespace with class 'ButtonFactory'
(function (ButtonFactory) {
    ButtonFactory.THIRTY_BY_THIRTY_BUTTON = ButtonFactory.createButton("30x30");
    ButtonFactory.SEVENTEEN_BY_SEVENTEEN_BUTTON = ButtonFactory.createButton("17x17");
    ButtonFactory.RANDOM_BUTTON = ButtonFactory.createButton("random");
    ButtonFactory.MULTI_COLORS_BUTTON = ButtonFactory.createButton("multi");
    ButtonFactory.REFRESH_BUTTON = ButtonFactory.createButton("refresh");
})(ButtonFactory || (ButtonFactory = {}));
const deployButtons = () => {
    const DIV_BUTTONS = document.querySelector("div.buttons");
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
// Example: min = 1, max = 10 => (number between 1 and 10). Use this function with a function that generates random color.
const getRandomNumberBetweenTwoNumbers = (min, max) => ({
    r: Math.floor(Math.random() * (max - min) + min),
    g: Math.floor(Math.random() * (max - min) + min), b: Math.floor(Math.random() * (max - min) + min)
});
const container = Container.getInstance();
// Call 'deployButtons()' when DOM content loaded.
document.addEventListener("DOMContentLoaded", deployButtons);
