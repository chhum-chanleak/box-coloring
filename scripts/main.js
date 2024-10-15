"use strict";
class Container {
    // Private constructor prevents direct instantiation from outside the class.
    constructor() {
        // A box for container
        this.createBox = (choice) => {
            const box = document.createElement("div");
            // increase '_numberOfBoxes' by 1.
            this.increaseNumberOfBoxes();
            box.setAttribute("class", `box ${this._numberOfBoxes}`);
            if (choice === 16) {
                box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;
            }
            else if (choice === 32) {
                box.style.cssText = `width: 40px; height: 40px; border: 1px solid #000;`;
            }
            else {
                throw new Error("The available choice is either 16 or 32.");
            }
            return box;
        };
        console.log("Instance has been created");
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
}
const container = Container.getInstance();
