"use strict";
class Container {
    // Private constructor prevents direct instantiation from outside the class.
    constructor() {
        console.log("Instance has been created");
        this._className = "";
        this._numberOfBoxes = 0;
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
    showDetail() {
        console.log("Hello, world!");
    }
}
