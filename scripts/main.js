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
        }
        else if (choice === 17) {
            container.style.cssText = `
        width: 700px;
        height: 700px;
    `;
            // Fill 'container' with big boxes.
            this.fillContainer(choice);
        }
        else {
            throw new Error("The available choice is either 30 or 17.");
        }
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
const container = Container.getInstance();
