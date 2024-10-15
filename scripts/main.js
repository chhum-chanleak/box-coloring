"use strict";
class Container {
    // Private constructor prevents direct instantiation from outside the class.
    constructor() {
        // A box for container
        this.createBox = () => {
            const box = document.createElement("div");
            // increase '_numberOfBoxes' by 1.
            this.increaseNumberOfBoxes();
            box.setAttribute("class", `box ${this._numberOfBoxes}`);
            box.style.cssText = `width: 20px; height: 20px; border: 1px solid #000;`;
            return box;
        };
        console.log("Instance has been created");
        this._className = "";
        this._numberOfBoxes = 0;
        this._currentColor = "";
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
    showDetail() {
        console.log("Hello, world!");
    }
}
const container = Container.getInstance();
